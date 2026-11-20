var editarServidorModel = require("../models/editarServidorModel");

function listarServidores(req, res) {

    var idEmpresa = req.params.idEmpresa;

    editarServidorModel.listarServidores(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function buscarServidorPorId(req, res) {

    var idServidor = req.params.idServidor;

    editarServidorModel.buscarServidorPorId(idServidor)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    listarServidores,
    buscarServidorPorId
};