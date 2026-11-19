var dashboardMatchingModel = require("../models/dashboardMatchingModel");

var TIPOS_GRAFICO = ["cpu", "memoria", "rede"];

// Garante que só números inteiros chegam no SQL
function idValido(valor) {
    return Number.isInteger(Number(valor)) && Number(valor) > 0;
}

function buscarKPIs(req, res) {
    var idServidor = req.params.idServidor;
    var idUsuario = req.params.idUsuario;

    if (!idValido(idServidor) || !idValido(idUsuario)) {
        return res.status(400).send("idServidor e idUsuario precisam ser números válidos!");
    }

    dashboardMatchingModel.buscarKPIs(Number(idServidor), Number(idUsuario))
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhuma leitura encontrada para este servidor!");
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar os KPIs do servidor: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarHistorico(req, res) {
    var idServidor = req.params.idServidor;
    var idUsuario = req.params.idUsuario;
    var tipo = req.params.tipo;

    if (!idValido(idServidor) || !idValido(idUsuario)) {
        return res.status(400).send("idServidor e idUsuario precisam ser números válidos!");
    }

    if (TIPOS_GRAFICO.indexOf(tipo) == -1) {
        return res.status(400).send("Tipo de gráfico inválido! Use: cpu, memoria ou rede.");
    }

    dashboardMatchingModel.buscarHistorico(Number(idServidor), Number(idUsuario), tipo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma leitura na última hora!");
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar o histórico do servidor: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKPIs,
    buscarHistorico
};