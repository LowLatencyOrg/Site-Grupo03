var express = require("express");
var router = express.Router();

var dashboardMatchingController = require("../controllers/dashboardMatchingController");


router.get("/kpis/:idServidor/:idUsuario", function (req, res) {
    dashboardMatchingController.buscarKPIs(req, res);
});


router.get("/historico/:idServidor/:idUsuario/:tipo", function (req, res) {
    dashboardMatchingController.buscarHistorico(req, res);
});

module.exports = router;