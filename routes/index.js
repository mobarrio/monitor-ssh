var express = require('express');
var router = express.Router();
var config = require('../routes/config');

router.get('/', function(req, res){
  res.render('index.ejs', { title: 'Dashboars 1.0', subtitulo: 'Informatica El Corte Ingles - Monitor de BTs', equipos: config.equipos });
});

module.exports = router;

