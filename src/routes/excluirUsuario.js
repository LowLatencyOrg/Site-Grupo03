var express = require("express");
var router = express.Router();

var excluirUsuarioController = require("../controllers/excluirUsuarioController");

router.get("/listarUsuarios/:idEmpresa", function (req, res) {
    excluirUsuarioController.listarUsuarios(req, res);
});

router.get("/buscarUsuarioPorId/:idUsuario", function (req, res) {
    excluirUsuarioController.buscarUsuarioPorId(req, res);
});

router.put("/excluir", function (req, res) {
    excluirUsuarioController.excluirUsuario(req, res);
});

module.exports = router;
