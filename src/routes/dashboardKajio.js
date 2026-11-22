var express = require("express");
var router = express.Router();

var dashboardKajioController = require("../controllers/dashboardKajioController");

router.get("/servidores/:idUsuario", function (req, res) {
    dashboardKajioController.listarServidores(req, res);
});

router.get("/dados/:idServidor/:idUsuario", function (req, res) {
    dashboardKajioController.buscarDados(req, res);
});

router.get("/historico/:idServidor/:idUsuario/:idComponente/:idMetrica", function (req, res) {
    dashboardKajioController.buscarHistorico(req, res);
});

module.exports = router;
