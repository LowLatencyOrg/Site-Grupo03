var express = require("express");
var router = express.Router();
var contatoModel = require("../models/contatoModel");

router.post("/cadastrar", function (req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined || email == undefined || telefone == undefined || empresa == undefined) {
        res.status(400).send("Seus dados estão indefinidos!");
        return;
    }

    contatoModel.salvar(nome, email, telefone, empresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
});

module.exports = router;