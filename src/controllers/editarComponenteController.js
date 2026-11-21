
var editarComponenteModel = require("../models/editarComponenteModel");

function listarServidores(req, res) {

    var idEmpresa = req.params.idEmpresa;

    editarComponenteModel.listarServidores(idEmpresa)
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

    editarComponenteModel.buscarServidorPorId(idServidor)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}


// Buscar os limites do componente
function buscarLimites(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idServidor = req.params.idServidor;
    var idComponente = req.params.idComponente;
    var idMetrica = req.params.idMetrica;

    editarComponenteModel.buscarLimites(
        idEmpresa,
        idServidor,
        idComponente,
        idMetrica
    )
        .then(function (resultado) {

            if (resultado.length == 0) {
                return res.status(404).json({
                    mensagem: "Limites não encontrados."
                });
            }

            res.status(200).json(resultado[0]);

        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}


// Atualizar os limites
function editarLimites(req, res) {

    var idEmpresa = req.body.idEmpresa;
    var idServidor = req.body.idServidor;
    var idComponente = req.body.idComponente;
    var idMetrica = req.body.idMetrica;

    var valorAlerta = Number(req.body.valorAlerta);
    var valorCritico = Number(req.body.valorCritico);

    if (
        !Number.isInteger(Number(idEmpresa)) ||
        !Number.isInteger(Number(idServidor)) ||
        !Number.isInteger(Number(idComponente)) ||
        !Number.isInteger(Number(idMetrica)) ||
        !Number.isFinite(valorAlerta) ||
        !Number.isFinite(valorCritico) ||
        valorAlerta < 0 ||
        valorCritico <= valorAlerta
    ) {
        return res.status(400).json({
            mensagem: "Dados inválidos."
        });
    }

    editarComponenteModel.editarLimites(
        idEmpresa,
        idServidor,
        idComponente,
        idMetrica,
        valorAlerta,
        valorCritico
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
    listarServidores,
    buscarServidorPorId,
    buscarLimites,
    editarLimites
};
