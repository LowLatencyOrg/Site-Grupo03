var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardPrincipalController");

router.get("/kpis/:idUsuario", function (req, res) {
    dashboardController.buscarKPIs(req, res);
});

router.get("/alertas-servidor/:idUsuario/:periodo", function (req, res) {
    dashboardController.buscarAlertasPorServidor(req, res);
});

module.exports = router;