var excluirServidorModel = require("../models/excluirServidorModel");

function listarServidores(req, res) {

    var idEmpresa = Number(req.params.idEmpresa);

    excluirServidorModel.listarServidores(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar servidores:", erro);
            res.status(500).json({
                mensagem: "Erro ao listar servidores."
            });
        });
}

function buscarServidorPorId(req, res) {

    var idServidor = Number(req.params.idServidor);

    excluirServidorModel.buscarServidorPorId(idServidor)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar servidor:", erro);
            res.status(500).json({
                mensagem: "Erro ao buscar servidor."
            });
        });
}

function excluirServidor(req, res) {

    var idServidor = Number(req.body.idServidor);
    var idEmpresa = Number(req.body.idEmpresa);

    if (
        !Number.isSafeInteger(idServidor) || idServidor <= 0 ||
        !Number.isSafeInteger(idEmpresa) || idEmpresa <= 0
    ) {
        return res.status(400).json({
            mensagem: "Dados inválidos."
        });
    }

    excluirServidorModel.excluirServidor(idServidor, idEmpresa)
        .then(function () {

            res.status(200).json({
                mensagem: "Servidor excluído permanentemente!"
            });

        })
        .catch(function (erro) {

            console.log("Erro ao excluir servidor:", erro);

            if (erro.codigo === "SERVIDOR_NAO_ENCONTRADO") {
                return res.status(404).json({
                    mensagem: "Servidor não encontrado."
                });
            }

            res.status(500).json({
                mensagem: "Erro ao excluir servidor."
            });

        });
}

module.exports = {
    listarServidores,
    buscarServidorPorId,
    excluirServidor
};