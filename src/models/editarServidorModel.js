var database = require("../database/config");

function listarServidores(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            id_servidor,
            hostname
        FROM servidor
        WHERE fk_empresa = ${idEmpresa};
    `;

    return database.executar(instrucaoSql);
}

function buscarServidorPorId(idServidor) {

    var instrucaoSql = `
        SELECT
            s.id_servidor,
            s.hostname,
            s.fk_sistema_operacional,
            s.fk_status
        FROM servidor s
        WHERE s.id_servidor = ${idServidor};
    `;

    return database.executar(instrucaoSql);
}

function listarSO(id_sistema_operacional){
    var instrucaoSql = `
        SELECT
        id_sistema_operacional, nome
        FROM sistema_operacional;
    `;

    return database.executar(instrucaoSql);
}

function listarStatus(){
    var instrucaoSql = `
        SELECT
        id_status, descricao
        FROM status_servidor;
    `;

    return database.executar(instrucaoSql);
}

function editarServidor(idServidor, hostname, so, status) {

    var instrucaoSql = `
        UPDATE servidor
        SET
            hostname = '${hostname}',
            fk_sistema_operacional = ${so},
            fk_status = ${status}
        WHERE id_servidor = ${idServidor};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    buscarServidorPorId,
    listarSO,
    listarStatus,
    editarServidor
}