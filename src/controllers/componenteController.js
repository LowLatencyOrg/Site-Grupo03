var componenteModel = require("../models/componenteModel")

function cadastrar(req, res) {
    console.log("entrei no controller")
    var idEmpresa = req.body.idEmpresaServer
    var idComponente = req.body.idComponenteServer
    var idServidor = req.body.idServidorServer
    var idMetrica = req.body.idMetricaServer
    var valorLimite1 = req.body.valorLimite1Server
    var valorLimite2 = req.body.valorLimite2Server

    if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (idComponente == undefined) {
        res.status(400).send("Seu idComponente está undefined!");
    } else if (idServidor == undefined) {
        res.status(400).send("Seu macAdress está undefined!");
    } else if (idMetrica == undefined) {
        res.status(400).send("Seu idMetrica está undefined!");
    } else if (valorLimite1 == undefined) {
        res.status(400).send("Seu valorLimite1 está undefined!");
    } else if (valorLimite2 == undefined) {
        res.status(400).send("Seu valorLimite2 está undefined!");
    } else {
        componenteModel.cadastrar(idServidor, idComponente, idEmpresa, idMetrica, valorLimite1, valorLimite2)
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

module.exports = {
    cadastrar
}