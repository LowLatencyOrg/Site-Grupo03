var express = require("express");
var router = express.Router();

var editarUsuarioController = require("../controllers/editarUsuarioController");


router.get("/listarUsuarios/:idEmpresa", function (req, res) {
    editarUsuarioController.listarUsuarios(req, res);
});


router.put("/editar", function (req, res) {
    editarUsuarioController.editarUsuario(req, res);
});


module.exports = router;