exports.servers = [
    { host: '192.168.1.231', port: '22' },
    { host: '192.168.1.232', port: '22' },
    { host: '192.168.1.233', port: '22' }
    // { host: 'linux.smoc.com.es', port: '1021' },
    // { host: 'linux.smoc.com.es', port: '1022' },
    // { host: 'linux.smoc.com.es', port: '1023' }
];

exports.equipos = { 
    "192.168.1.231" : { "vname":"BTXXXXX","tipo":"VM","estacion":"Casa"} ,
    "192.168.1.232" : { "vname":"BTXXXXX","tipo":"VM","estacion":"Casa"} ,
    "192.168.1.233" : { "vname":"BTXXXXX","tipo":"VM","estacion":"Casa"} ,
    "linux.smoc.com.es" : { "vname":"BTXXXXX","tipo":"VM","estacion":"Casa"}
};

exports.username = 'root';
exports.password = '';
exports.rate = 1000;
exports.poolSize = 10;
exports.maintainConnections = 2;
exports.logLevel = 'info';