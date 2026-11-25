var express = require("express");
var router = express.Router();

var excluirComponenteController = require("../controllers/excluirComponenteController");

router.get("/listarServidores", function (req, res) {
    excluirComponenteController.listarServidores(req, res);
});

router.get("/listarComponentes/:idServidor", function (req, res) {
    excluirComponenteController.listarComponentes(req, res);
});

router.get("/listarMetricas/:idServidor/:idComponente", function (req, res) {
    excluirComponenteController.listarMetricas(req, res);
});

router.put("/excluir", function (req, res) {
    excluirComponenteController.excluirComponente(req, res);
});

module.exports = router;
