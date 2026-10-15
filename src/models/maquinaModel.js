var database = require("../database/config")

function cadastrar(idEmpresa, hostname, macAddress, so, status) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", );

    query = `INSERT INTO servidor (hostname, mac_adress, fk_sistema_operacional, fk_empresa, fk_status) VALUES ('${hostname}', '${macAddress}', ${so}, ${idEmpresa}, ${status})`

    console.log("Executando query: \n" + query)
    return database.executar(query)
}

function buscarServidores(idEmpresa) {
    console.log("ACESSEI O MAQUINA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarServidores():", );

    query = `SELECT id_servidor, hostname FROM lowLatency.servidor where fk_empresa = ${idEmpresa}`

    console.log("Executando query: \n" + query)
    return database.executar(query)
}

module.exports = {
    cadastrar,
    buscarServidores
}