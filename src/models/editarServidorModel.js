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
            s.sistema_operacional,
            s.fk_status,
            st.descricao AS status
        FROM servidor s
        JOIN status_servidor st
            ON s.fk_status = st.id_status
        WHERE s.id_servidor = ${idServidor};
    `;

    return database.executar(instrucaoSql);
}

function buscarSO(id_sistema_operacional){
    var instrucaoSql = `
        SELECT 
        ;
    `;
}

module.exports = {
    listarServidores,
    buscarServidorPorId
}