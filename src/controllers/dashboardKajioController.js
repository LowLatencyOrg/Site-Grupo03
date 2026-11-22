var dashboardKajioModel = require("../models/dashboardKajioModel");

function idValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function listarServidores(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idValido(idUsuario)) {
        return res.status(400).send("idUsuario precisa ser um número válido!");
    }

    dashboardKajioModel.listarServidores(Number(idUsuario))
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar servidores da dashboard individual: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro ao listar servidores.");
        });
}

function buscarDados(req, res) {
    var idServidor = req.params.idServidor;
    var idUsuario = req.params.idUsuario;

    if (!idValido(idServidor) || !idValido(idUsuario)) {
        return res.status(400).send("idServidor e idUsuario precisam ser números válidos!");
    }

    Promise.all([
        dashboardKajioModel.buscarLeiturasAtuais(Number(idServidor), Number(idUsuario)),
        dashboardKajioModel.buscarRankingProcessos(Number(idServidor), Number(idUsuario)),
        dashboardKajioModel.buscarComponenteComMaisProblemas(Number(idServidor), Number(idUsuario))
    ])
        .then(function (resultados) {
            res.status(200).json({
                leituras: resultados[0],
                rankingProcessos: resultados[1],
                componenteProblemas: resultados[2].length > 0 ? resultados[2][0] : null
            });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar dados da dashboard individual: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar dados da dashboard individual.");
        });
}

function buscarHistorico(req, res) {
    var idServidor = req.params.idServidor;
    var idUsuario = req.params.idUsuario;
    var idComponente = req.params.idComponente;
    var idMetrica = req.params.idMetrica;

    if (!idValido(idServidor) || !idValido(idUsuario) || !idValido(idComponente) || !idValido(idMetrica)) {
        return res.status(400).send("Os identificadores precisam ser números válidos!");
    }

    dashboardKajioModel.buscarHistorico(
        Number(idServidor),
        Number(idUsuario),
        Number(idComponente),
        Number(idMetrica)
    )
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar histórico da métrica: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro ao buscar histórico da métrica.");
        });
}

module.exports = {
    listarServidores,
    buscarDados,
    buscarHistorico
};
