var express = require("express");
var router = express.Router();

var editarServidorController = require("../controllers/editarServidorController");

router.get("/listarServidores/:idEmpresa", function (req, res) {
    editarServidorController.listarServidores(req, res);
});

router.get("/buscarServidor/:idServidor", function (req, res) {
    editarServidorController.buscarServidorPorId(req, res);
});

module.exports = router;