
var excluirUsuarioModel = require("../models/excluirUsuarioModel");

function listarUsuarios(req, res) {

    var idEmpresa = req.params.idEmpresa;

    excluirUsuarioModel.listarUsuarios(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function buscarUsuarioPorId(req, res) {

    var idUsuario = req.params.idUsuario;

    excluirUsuarioModel.buscarUsuarioPorId(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function excluirUsuario(req, res) {

    var idUsuario = req.body.idUsuario;
    var idEmpresa = req.body.idEmpresa;

    if (
        !Number.isInteger(Number(idUsuario)) ||
        !Number.isInteger(Number(idEmpresa))
    ) {
        return res.status(400).json();
    }

    excluirUsuarioModel.excluirUsuario(idUsuario, idEmpresa)
        .then(function (resultado) {

            if (resultado.affectedRows === 0) {
                return res.status(404).json();
            }

            res.status(200).json();

        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json();

        });
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    excluirUsuario
};
