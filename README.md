# monitor-ssh 

* [Install](#install)  
* [Config](#config)  
* [Run](#run)

### Install
```javascript
[root@centos ~]# git clone https://github.com/mobarrio/monitor-ssh.git
Cloning into 'monitor-ssh'...
remote: Counting objects: 42, done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 42 (delta 11), reused 35 (delta 5), pack-reused 0
Unpacking objects: 100% (42/42), done.

[root@centos ~]# cd monitor-ssh/

[root@centos monitor-ssh]# npm install
```

### Config
```jacascript
#Lista de servers y puertos
exports.servers = [
    { host: "192.168.1.231" , port: "22" },
    { host: "192.168.1.232" , port: "22" },
    { host: "192.168.1.233" , port: "22" }
];

# Lista de equipos a monitorizar
#   Nota: Pediente de unificar 
exports.equipos = { 
    "192.168.1.231" : { "vname":"BT02237","tipo":"PMR","estacion":"Intermodal 1" } ,
    "192.168.1.232" : { "vname":"BT02245","tipo":"PMR","estacion":"Intermodal 2" } ,
    "192.168.1.233" : { "vname":"BT02248","tipo":"PMR","estacion":"Intermodal 3" }
};

exports.username = 'root'; // SSH user name
exports.password = ''; // SSH User Password
//exports.privateKey = '/root/.ssh/id_rsa'; // Si se utiliza la clave la PSW de Usuario no es necesaria.
exports.privateKey = ''; 
exports.rate = 1000; // Tiempo entre cada consulta SSH lanzada.
exports.poolSize = 10; // Futuras mejoras
exports.logLevel = 'info'; // Nievel de log (info, trace, debug)
```

### Run
```javascript
[root@centos monitor-ssh]# npm start

> monitor@0.0.0 start /home/monitor-ssh
> node ./bin/start.js

Server linten on port:  3000
```


