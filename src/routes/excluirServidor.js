var express = require("express");
var router = express.Router();

var excluirServidorController = require("../controllers/excluirServidorController");

router.get("/listarServidores/:idEmpresa", function (req, res) {
    excluirServidorController.listarServidores(req, res);
});

router.get("/buscarServidor/:idServidor", function (req, res) {
    excluirServidorController.buscarServidorPorId(req, res);
});

router.delete("/excluir", function (req, res) {
    excluirServidorController.excluirServidor(req, res);
});

module.exports = router;