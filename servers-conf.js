exports.servers = [
    { host: "192.168.1.231" , port: "22" },
    { host: "192.168.1.232" , port: "22" },
    { host: "192.168.1.233" , port: "22" }
];

exports.equipos = { 
    "192.168.1.231" : { "vname":"BT02237","tipo":"PMR","estacion":"Intermodal 1"} ,
    "192.168.1.232" : { "vname":"BT02245","tipo":"PMR","estacion":"Intermodal 2"} ,
    "192.168.1.233" : { "vname":"BT02248","tipo":"PMR","estacion":"Intermodal 3"}
};

exports.username = 'root';
exports.password = '';
//exports.privateKey = '/root/.ssh/id_rsa';
exports.privateKey = '';
exports.rate = 1000;
exports.poolSize = 10;
exports.maintainConnections = 2;
exports.logLevel = 'info';