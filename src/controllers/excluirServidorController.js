var excluirServidorModel = require("../models/excluirServidorModel");

function listarServidores(req, res) {

    var idEmpresa = req.params.idEmpresa;

    excluirServidorModel.listarServidores(idEmpresa)
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

    excluirServidorModel.buscarServidorPorId(idServidor)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function excluirServidor(req, res) {

    var idServidor = req.body.idServidor;
    var idEmpresa = req.body.idEmpresa;

    if (
        !Number.isInteger(Number(idServidor)) ||
        !Number.isInteger(Number(idEmpresa))
    ) {
        return res.status(400).json({
            mensagem: "Dados inválidos."
        });
    }

    excluirServidorModel.excluirServidor(idServidor, idEmpresa)
        .then(function (resultado) {

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Servidor não encontrado ou já está inativo."
                });
            }

            res.status(200).json({
                mensagem: "Servidor inativado com sucesso!"
            });

        })
        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro);

        });
}

module.exports = {
    listarServidores,
    buscarServidorPorId,
    excluirServidor
};