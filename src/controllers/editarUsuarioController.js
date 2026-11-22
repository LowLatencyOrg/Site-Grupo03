var editarUsuarioModel = require("../models/editarUsuarioModel");


function listarUsuarios(req, res) {

    var idEmpresa = req.params.idEmpresa;

    editarUsuarioModel.listarUsuarios(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}


function editarUsuario(req, res) {

    var idEmpresa = req.body.idEmpresa;
    var idUsuario = req.body.idUsuario;
    var nome = req.body.nome;
    var email = req.body.email;
    var cargo = req.body.cargo;
    var senha = req.body.senha;

    if (
        !Number.isInteger(Number(idEmpresa)) ||
        !Number.isInteger(Number(idUsuario)) ||
        !Number.isInteger(Number(cargo)) ||
        !nome ||
        !email
    ) {
        return res.status(400).json({
            mensagem: "Dados inválidos."
        });
    }

    editarUsuarioModel.editarUsuario(
        idEmpresa,
        idUsuario,
        nome,
        email,
        cargo,
        senha
    )
        .then(function (resultado) {

            res.status(200).json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro);

        });
}


module.exports = {
    listarUsuarios,
    editarUsuario
};