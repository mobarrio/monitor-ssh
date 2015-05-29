var   Client = require('ssh2').Client
    , EventEmitter = require('events').EventEmitter
    , util = require('util')
    , config = require('./config')
    , Logger = config.logger
    , crypto = require('crypto')
    , _ = require('underscore');

var SSHConn = function(server) {
    if (!(this instanceof SSHConn)) return new SSHConn(server);

    var self = this;
    EventEmitter.call(this);
    this._client = null;
    this._server = server || {};
    this._queue = config.servers;
    this._running = false;
    this._rate = config.rate;

    this.destroyClient = function () {
        this._client.end();
    };

    this.flush = function () {
      this._queue.length = 0;
    };
     
    this.stop = function () {
      this.running = false;
      clearInterval(this.interval);
    };

    this.start = function () {
      var self = this;
      if (!this.running) {
        this.running = true;
        this.interval = setInterval(function () {
            /* Recupera el server y rota su posicion */
            var server = self._queue.shift();
            self._queue.push(server);
            self.createExecute(server,'fullCMD');
        }, this._rate);
      }
    };

    this.checksum = function(str, algorithm, encoding) {
        return crypto.createHash(algorithm || 'md5').update(str, 'utf8').digest(encoding || 'hex')
    }


    this.createExecute = function (server, exec_cmd, callback) {
        if(exec_cmd === 'cpuUsage')             { exec_str = "top -b -d1 -n1|grep -i 'Cpu(s)'|awk '{print $2+$4}'"; }
        else if (exec_cmd === 'memoryInfo')     { exec_str = 'cat /proc/meminfo'; }
        else if (exec_cmd === 'percentageUsed') { exec_str = 'df ' + param1 + ' -h | tail -n 1'; }
        else if (exec_cmd === 'lastReboot')     { exec_str = 'last reboot|head -1'; }
        else if (exec_cmd === 'uptime')         { exec_str = 'uptime'; }
        else if (exec_cmd === 'hostname')       { exec_str = 'hostname'; }
        else if (exec_cmd === 'fullCMD')        { exec_str = "/root/hostinfo.sh"; }
        else { 
            if(callback) callback(err, "Comando no definido."); 
            return(false);
        }

        Logger.debug("Creando conexion con " + server.host + ":" + server.port);
        var Client = require('ssh2').Client;
        var conn = new Client();
        conn.on('error', function(e) { 
            if (Logger.info) Logger.error("SSHConn[" + server.host + ":" + server.port + "] Connection error MSG: ["+e+"]"); 
        }).on('ready', function() {
          if (Logger.debug) Logger.debug(self.logMessage('Connection established'));
          var result = '';
          conn.exec(exec_str, function(error, stream) {
            if (error) {
                if (Logger.debug) Logger.error(self.logMessage('Connection error '+error));
                throw error;
            }
            stream.on('close', function(code, signal) {
                if (Logger.debug) Logger.debug(self.logMessage('Connection close '));
                conn.end();
            }).on('close', function(had_error) {
                if (had_error)         Logger.error(self.logMessage('Connection closed due to error'));
                else if (Logger.debug) Logger.debug(self.logMessage('Connection closed cleanly'));
            }).on('end', function()    { 
                if (Logger.debug) Logger.debug(self.logMessage('Connection ended '));
                if(result === '' || result === 'undefined') {
                    if (Logger.debug) Logger.error(self.logMessage('Connection ended empty message.'));
                    return(false); 
                }
                var ret = JSON.parse(result);
                ret.vname = config.equipos[server.host].vname || '';
                ret.tipo = config.equipos[server.host].tipo || '';
                ret.estacion = config.equipos[server.host].estacion || '';
                self.emit("ready", ret);
            }).on('data', function(chunk) {
                result += chunk.toString();
            });
          });
        }).connect({
            host: server.host,
            port: server.port,
            readyTimeout: 99999,
            username: config.username,
            password: config.password,
            privateKey: (config.privateKey ? require('fs').readFileSync(config.privateKey) : "")
        });
        return(this._client);
    };

    this.logMessage = function(message) {
        var host = this._server.host;
        var port = this._server.port ? this._server.port : "";
        message = 'SSHConn[' + host + ":" + port.toString() + "] " + message;
        return message;
    };

};

util.inherits(SSHConn, EventEmitter);

exports.SSHConn = SSHConn;


