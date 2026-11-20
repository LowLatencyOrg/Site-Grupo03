var database = require("../database/config");

// fk_alerta: 1 = normal, 2 = alerta, 3 = critico
// Considera como "alerta" toda leitura com fk_alerta > 1

function buscarKPIs(idUsuario) {
    var instrucaoSql = `
        SELECT
            (
                SELECT COUNT(*)
                FROM leitura l
                JOIN servidor s ON l.fk_servidor = s.id_servidor
                WHERE s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
                AND l.fk_alerta > 1
                AND DATE(l.dia_hora) = CURDATE()
            ) AS totalAlertas,

            (
                SELECT s.hostname
                FROM leitura l
                JOIN servidor s ON l.fk_servidor = s.id_servidor
                WHERE s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
                AND l.fk_alerta > 1
                AND DATE(l.dia_hora) = CURDATE()
                GROUP BY s.id_servidor, s.hostname
                ORDER BY COUNT(*) DESC
                LIMIT 1
            ) AS servidorMaisAlertas,

            (
                SELECT DATE_FORMAT(MAX(l.dia_hora), '%H:%i')
                FROM leitura l
                JOIN servidor s ON l.fk_servidor = s.id_servidor
                WHERE s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
                AND l.fk_alerta > 1
            ) AS ultimaOcorrencia,

            (
                SELECT a.descricao
                FROM leitura l
                JOIN servidor s ON l.fk_servidor = s.id_servidor
                JOIN alerta a ON l.fk_alerta = a.id_alerta
                WHERE s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
                AND l.dia_hora >= NOW() - INTERVAL 5 MINUTE
                ORDER BY l.fk_alerta DESC
                LIMIT 1
            ) AS statusGeral;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarAlertasPorServidor(idUsuario, periodo) {

    // Filtro de data conforme o botão escolhido (valores fixos, sem texto do usuário no SQL)
    var filtroData = "DATE(l.dia_hora) = CURDATE()";

    if (periodo == "7d") {
        filtroData = "l.dia_hora >= CURDATE() - INTERVAL 6 DAY";
    } else if (periodo == "30d") {
        filtroData = "l.dia_hora >= CURDATE() - INTERVAL 29 DAY";
    }

    var instrucaoSql = `
        SELECT
            s.hostname AS servidor,
            SUM(CASE WHEN l.fk_alerta = 2 THEN 1 ELSE 0 END) AS alertas,
            SUM(CASE WHEN l.fk_alerta = 3 THEN 1 ELSE 0 END) AS criticos
        FROM leitura l
        JOIN servidor s ON l.fk_servidor = s.id_servidor
        WHERE s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
        AND l.fk_alerta > 1
        AND ${filtroData}
        GROUP BY s.id_servidor, s.hostname
        ORDER BY (alertas + criticos) DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarAlertasPorServidor
};