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

function listarSO(req, res) {

    editarServidorModel.listarSO()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function listarStatus(req, res) {

    editarServidorModel.listarStatus()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function editarServidor(req, res) {

    var idServidor = req.body.idServidor;
    var hostname = req.body.hostnameServer;
    var so = req.body.soServer;
    var status = req.body.statusServer;

    console.log("ID Servidor:", idServidor);
    console.log("Hostname:", hostname);
    console.log("Sistema Operacional:", so);
    console.log("Status:", status);

    editarServidorModel.editarServidor(idServidor, hostname, so, status)
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
    buscarServidorPorId,
    listarSO,
    listarStatus,
    editarServidor
};