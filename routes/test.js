var Logger = require('./config').logger;
var config = require('./config');

//var equipos = JSON.parse(config.equipos);

//process.exit(0);

var SSHConn = require("./sshconn");
var conn = SSHConn.SSHConn();
conn.start();
// var client = conn.createClient();
conn.on("ready", function(data){
	console.log(data);
	console.log("=========================================================================================================");
});
