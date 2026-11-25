var excluirComponenteModel = require("../models/excluirComponenteModel");

function listarServidores(req, res) {
    excluirComponenteModel.listarServidores()
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

function listarComponentes(req, res) {
    var idServidor = Number(req.params.idServidor);

    if (!idServidor || isNaN(idServidor)) {
        return res.status(400).json({
            mensagem: "ID do servidor inválido."
        });
    }

    excluirComponenteModel.listarComponentes(idServidor)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar componentes:", erro);
            res.status(500).json({
                mensagem: "Erro ao listar componentes."
            });
        });
}

function listarMetricas(req, res) {
    var idServidor = Number(req.params.idServidor);
    var idComponente = Number(req.params.idComponente);

    if (!idServidor || isNaN(idServidor) ||
        !idComponente || isNaN(idComponente)) {
        return res.status(400).json({
            mensagem: "IDs do servidor ou componente inválidos."
        });
    }

    excluirComponenteModel.listarMetricas(idServidor, idComponente)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar métricas:", erro);
            res.status(500).json({
                mensagem: "Erro ao listar métricas."
            });
        });
}

function excluirComponente(req, res) {
    var idServidor = Number(req.body.idServidor);
    var idComponente = Number(req.body.idComponente);
    var idMetrica = Number(req.body.idMetrica);

    if (!idServidor || isNaN(idServidor) ||
        !idComponente || isNaN(idComponente) ||
        !idMetrica || isNaN(idMetrica)) {
        return res.status(400).json({
            mensagem: "Selecione um servidor, componente e métrica válidos."
        });
    }

    excluirComponenteModel.excluirComponente(
        idServidor,
        idComponente,
        idMetrica
    )
        .then(function (resultado) {
            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Componente ou métrica não encontrada ou já excluída."
                });
            }

            res.status(200).json({
                mensagem: "Componente excluído com sucesso!"
            });
        })
        .catch(function (erro) {
            console.log("Erro ao excluir componente:", erro);
            res.status(500).json({
                mensagem: "Erro ao excluir componente."
            });
        });
}

module.exports = {
    listarServidores,
    listarComponentes,
    listarMetricas,
    excluirComponente
};