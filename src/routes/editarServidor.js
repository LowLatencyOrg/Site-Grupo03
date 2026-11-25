var express = require("express");
var router = express.Router();

var editarServidorController = require("../controllers/editarServidorController");

router.get("/listarServidores/:idEmpresa", function (req, res) {
    editarServidorController.listarServidores(req, res);
});

router.get("/buscarServidor/:idServidor", function (req, res) {
    editarServidorController.buscarServidorPorId(req, res);
});

router.get("/listarSO/", function (req, res) {
    editarServidorController.listarSO(req, res);
});

router.get("/listarStatus/", function (req, res) {
    editarServidorController.listarStatus(req, res);
});

router.post("/editarServidor", function (req, res) {
    editarServidorController.editarServidor(req, res);
});


module.exports = router;