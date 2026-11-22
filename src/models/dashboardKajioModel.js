var database = require("../database/config");

function listarServidores(idUsuario) {
    var instrucaoSql = `
        SELECT
            s.id_servidor,
            s.hostname
        FROM servidor s
        WHERE s.fk_empresa = (
            SELECT u.fk_empresa
            FROM usuario u
            WHERE u.id_usuario = ${idUsuario}
        )
        ORDER BY s.id_servidor ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarLeiturasAtuais(idServidor, idUsuario) {
    var instrucaoSql = `
        SELECT
            l.id_leitura,
            l.fk_servidor,
            l.fk_componente,
            c.nome AS componente,
            l.fk_metrica,
            m.descricao AS metrica,
            l.valor,
            l.fk_unidade_medida,
            u.descricao AS unidade,
            l.fk_alerta,
            a.descricao AS alerta,
            DATE_FORMAT(l.dia_hora, '%d/%m/%Y %H:%i:%s') AS dia_hora,
            lim.limite_alerta,
            lim.limite_critico
        FROM leitura l
        JOIN servidor s
            ON s.id_servidor = l.fk_servidor
        JOIN componente c
            ON c.id_componente = l.fk_componente
        JOIN metrica m
            ON m.id_metrica = l.fk_metrica
        JOIN unidade_medida u
            ON u.id_unidade = l.fk_unidade_medida
        JOIN alerta a
            ON a.id_alerta = l.fk_alerta
        JOIN (
            SELECT
                fk_componente,
                fk_metrica,
                MAX(id_leitura) AS id_ultima_leitura
            FROM leitura
            WHERE fk_servidor = ${idServidor}
            GROUP BY fk_componente, fk_metrica
        ) ultimas
            ON ultimas.id_ultima_leitura = l.id_leitura
        LEFT JOIN (
            SELECT
                fk_servidor,
                fk_componente,
                fk_metrica,
                MAX(CASE WHEN fk_alerta = 2 THEN valor END) AS limite_alerta,
                MAX(CASE WHEN fk_alerta = 3 THEN valor END) AS limite_critico
            FROM limite
            WHERE fk_servidor = ${idServidor}
            GROUP BY fk_servidor, fk_componente, fk_metrica
        ) lim
            ON lim.fk_servidor = l.fk_servidor
            AND lim.fk_componente = l.fk_componente
            AND lim.fk_metrica = l.fk_metrica
        WHERE s.id_servidor = ${idServidor}
        AND s.fk_empresa = (
            SELECT u2.fk_empresa
            FROM usuario u2
            WHERE u2.id_usuario = ${idUsuario}
        )
        ORDER BY l.dia_hora DESC, l.id_leitura DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRankingProcessos(idServidor, idUsuario) {
    var instrucaoSql = `
        SELECT
            rp.id_ranking,
            rp.posicao,
            rp.pid,
            rp.usuario,
            rp.cpu_porcent AS cpu,
            rp.ram_porcent AS ram,
            DATE_FORMAT(rp.dia_hora, '%d/%m/%Y %H:%i:%s') AS dia_hora
        FROM ranking_processos rp
        JOIN servidor s
            ON s.id_servidor = rp.fk_servidor
        WHERE rp.fk_servidor = ${idServidor}
        AND s.fk_empresa = (
            SELECT u.fk_empresa
            FROM usuario u
            WHERE u.id_usuario = ${idUsuario}
        )
        ORDER BY rp.id_ranking ASC
        LIMIT 5;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarComponenteComMaisProblemas(idServidor, idUsuario) {
    var instrucaoSql = `
        SELECT
            c.id_componente,
            c.nome AS componente,
            SUM(CASE WHEN l.fk_alerta = 2 THEN 1 ELSE 0 END) AS alertas,
            SUM(CASE WHEN l.fk_alerta = 3 THEN 1 ELSE 0 END) AS criticos,
            COUNT(*) AS total_problemas
        FROM leitura l
        JOIN servidor s
            ON s.id_servidor = l.fk_servidor
        JOIN componente c
            ON c.id_componente = l.fk_componente
        WHERE l.fk_servidor = ${idServidor}
        AND s.fk_empresa = (
            SELECT u.fk_empresa
            FROM usuario u
            WHERE u.id_usuario = ${idUsuario}
        )
        AND l.fk_alerta IN (2, 3)
        AND DATE(l.dia_hora) = CURDATE()
        GROUP BY c.id_componente, c.nome
        ORDER BY total_problemas DESC, criticos DESC, c.id_componente ASC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistorico(idServidor, idUsuario, idComponente, idMetrica) {
    var instrucaoSql = `
        SELECT historico.*
        FROM (
            SELECT
                l.id_leitura,
                l.valor,
                l.fk_alerta,
                DATE_FORMAT(l.dia_hora, '%H:%i:%s') AS horario,
                l.dia_hora
            FROM leitura l
            JOIN servidor s
                ON s.id_servidor = l.fk_servidor
            WHERE l.fk_servidor = ${idServidor}
            AND l.fk_componente = ${idComponente}
            AND l.fk_metrica = ${idMetrica}
            AND s.fk_empresa = (
                SELECT u.fk_empresa
                FROM usuario u
                WHERE u.id_usuario = ${idUsuario}
            )
            ORDER BY l.dia_hora DESC, l.id_leitura DESC
            LIMIT 5
        ) historico
        ORDER BY historico.dia_hora ASC, historico.id_leitura ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    buscarLeiturasAtuais,
    buscarRankingProcessos,
    buscarComponenteComMaisProblemas,
    buscarHistorico
};
