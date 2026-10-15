var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController")

router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})

router.get("/buscarServidores/:idEmpresa", function (req, res) {
    maquinaController.buscarServidores(req, res);
})


module.exports = router;