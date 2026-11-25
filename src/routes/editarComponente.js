
var express = require("express");
var router = express.Router();

var editarComponenteController =
    require("../controllers/editarComponenteController");


router.get("/listarServidores/:idEmpresa", function (req, res) {
    editarComponenteController.listarServidores(req, res);
});


router.get("/buscarServidor/:idServidor", function (req, res) {
    editarComponenteController.buscarServidorPorId(req, res);
});


router.get(
    "/buscarLimites/:idEmpresa/:idServidor/:idComponente/:idMetrica",
    function (req, res) {
        editarComponenteController.buscarLimites(req, res);
    }
);


router.put("/editarLimites", function (req, res) {
    editarComponenteController.editarLimites(req, res);
});


module.exports = router;
