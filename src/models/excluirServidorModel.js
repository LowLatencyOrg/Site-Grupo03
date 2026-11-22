var database = require("../database/config");

function listarServidores(idEmpresa) {

    var instrucaoSql = `
        SELECT
            id_servidor,
            hostname
        FROM servidor
        WHERE fk_empresa = ${Number(idEmpresa)}
        AND fk_status = 1
        ORDER BY hostname;
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

function excluirServidor(idServidor, idEmpresa) {

    var instrucaoSql = `
        UPDATE servidor
        SET fk_status = 2
        WHERE id_servidor = ${Number(idServidor)}
        AND fk_empresa = ${Number(idEmpresa)}
        AND fk_status = 1;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    buscarServidorPorId,
    excluirServidor
};