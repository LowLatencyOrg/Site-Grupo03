var dashboardModel = require("../models/dashboardPrincipalModel");

function buscarKPIs(req, res) {

    var idUsuario = req.params.idUsuario;

    dashboardModel.buscarKPIs(idUsuario)
        .then(function (resultado) {

            res.status(200).json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });

}

function buscarAlertasPorServidor(req, res) {

    var idUsuario = req.params.idUsuario;
    var periodo = req.params.periodo;

    dashboardModel.buscarAlertasPorServidor(idUsuario, periodo)
        .then(function (resultado) {

            res.status(200).json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });

}

module.exports = {
    buscarKPIs,
    buscarAlertasPorServidor
};