var database = require("../database/config");

function listarServidores() {
    var instrucaoSql = `
        SELECT id_servidor, hostname
        FROM servidor
        WHERE fk_status = 1
        ORDER BY hostname;
    `;

    return database.executar(instrucaoSql);
}

function listarComponentes(idServidor) {
    var instrucaoSql = `
        SELECT DISTINCT c.id_componente, c.nome
        FROM servidor_componente_metrica scm
        INNER JOIN componente c
            ON c.id_componente = scm.fk_componente
        WHERE scm.fk_servidor = ${Number(idServidor)}
          AND scm.ativo = TRUE
        ORDER BY c.nome;
    `;

    return database.executar(instrucaoSql);
}

function listarMetricas(idServidor, idComponente) {
    var instrucaoSql = `
        SELECT m.id_metrica, m.descricao
        FROM servidor_componente_metrica scm
        INNER JOIN metrica m
            ON m.id_metrica = scm.fk_metrica
        WHERE scm.fk_servidor = ${Number(idServidor)}
          AND scm.fk_componente = ${Number(idComponente)}
          AND scm.ativo = TRUE
        ORDER BY m.descricao;
    `;

    return database.executar(instrucaoSql);
}

function excluirComponente(idServidor, idComponente, idMetrica) {
    var instrucaoSql = `
        UPDATE servidor_componente_metrica
        SET ativo = FALSE
        WHERE fk_servidor = ${Number(idServidor)}
          AND fk_componente = ${Number(idComponente)}
          AND fk_metrica = ${Number(idMetrica)}
          AND ativo = TRUE;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    listarComponentes,
    listarMetricas,
    excluirComponente
};