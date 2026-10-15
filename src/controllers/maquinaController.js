var maquinaModel = require("../models/maquinaModel");

function cadastrar(req, res) {
    var idEmpresa = req.body.idEmpresaServer
    var hostname = req.body.hostnameServer
    var macAddress = req.body.macAddressServer
    var so = req.body.soServer
    var status = req.body.statusServer

    console.log("entrei no controller")
    if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (hostname == undefined) {
        res.status(400).send("Seu hostname está undefined!");
    } else if (macAddress == undefined) {
        res.status(400).send("Seu macAdress está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Seu SO está undefined!");
    } else if (status == undefined) {
        res.status(400).send("Seu status está undefined!");
    } else {
        maquinaModel.cadastrar(idEmpresa, hostname, macAddress, so, status)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarServidores(req, res) {
    var idEmpresa = req.params.idEmpresa

    maquinaModel.buscarServidores(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro)
        console.log("Houve um erro ao buscar os servidores: ",erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    })
}

module.exports = {
    cadastrar,
    buscarServidores
}