var database = require("../database/config");

// componente: 1 = cpu, 2 = ram, 3 = disco, 4 = rede
// metrica:    1 = Uso (%), 2 = Interrupções de software (%), 3 = IOWait,
// 4 = Uso da SWAP (%), 5 = IOPS, 6 = Pacotes Enviados (KB), 7 = Pacotes Recebidos (KB)
// fk_alerta:  1 = normal, 2 = alerta, 3 = critico

var SERIES_GRAFICO = {
    cpu:{ componente: 1, serie1: 1, serie2: 2 }, // uso de CPU e softirq
    memoria:{ componente: 2, serie1: 1, serie2: 4 }, // uso de RAM e SWAP
    rede:{ componente: 4, serie1: 7, serie2: 6 }  // dados recebidos e enviados
};


function buscarKPIs(idServidor, idUsuario) {
    var instrucaoSql = `
        SELECT
            s.hostname,

            MAX(CASE WHEN l.fk_componente = 1 AND l.fk_metrica = 1 THEN l.valor END) AS cpuUso,
            MAX(CASE WHEN l.fk_componente = 1 AND l.fk_metrica = 1 THEN l.fk_alerta END) AS cpuAlerta,

            MAX(CASE WHEN l.fk_componente = 1 AND l.fk_metrica = 2 THEN l.valor END) AS softirq,
            MAX(CASE WHEN l.fk_componente = 1 AND l.fk_metrica = 2 THEN l.fk_alerta END) AS softirqAlerta,

            MAX(CASE WHEN l.fk_componente = 2 AND l.fk_metrica = 1 THEN l.valor END) AS ramUso,
            MAX(CASE WHEN l.fk_componente = 2 AND l.fk_metrica = 1 THEN l.fk_alerta END) AS ramAlerta,

            MAX(CASE WHEN l.fk_componente = 2 AND l.fk_metrica = 4 THEN l.valor END) AS swapUso,
            MAX(CASE WHEN l.fk_componente = 2 AND l.fk_metrica = 4 THEN l.fk_alerta END) AS swapAlerta,

            MAX(CASE WHEN l.fk_componente = 3 AND l.fk_metrica = 1 THEN l.valor END) AS discoUso,
            MAX(CASE WHEN l.fk_componente = 3 AND l.fk_metrica = 1 THEN l.fk_alerta END) AS discoAlerta,

            MAX(CASE WHEN l.fk_componente = 4 AND l.fk_metrica = 7 THEN l.valor END) AS redeRecebidos,
            MAX(CASE WHEN l.fk_componente = 4 AND l.fk_metrica = 6 THEN l.valor END) AS redeEnviados,

            DATE_FORMAT(MAX(l.dia_hora), '%d/%m, %H:%i:%s') AS atualizadoEm
        FROM leitura l
        JOIN servidor s ON l.fk_servidor = s.id_servidor
        JOIN (
            SELECT MAX(id_leitura) AS id_ultima
            FROM leitura
            WHERE fk_servidor = ${idServidor}
            GROUP BY fk_componente, fk_metrica
        ) ultimas ON l.id_leitura = ultimas.id_ultima
        WHERE s.id_servidor = ${idServidor}
        AND s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
        GROUP BY s.id_servidor, s.hostname;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarHistorico(idServidor, idUsuario, tipo) {

    var series = SERIES_GRAFICO[tipo] || SERIES_GRAFICO.cpu;

    var instrucaoSql = `
        SELECT
            DATE_FORMAT(FROM_UNIXTIME(FLOOR(UNIX_TIMESTAMP(MIN(l.dia_hora)) / 300) * 300), '%H:%i') AS horario,
            ROUND(AVG(CASE WHEN l.fk_metrica = ${series.serie1} THEN l.valor END), 2) AS serie1,
            ROUND(AVG(CASE WHEN l.fk_metrica = ${series.serie2} THEN l.valor END), 2) AS serie2
        FROM leitura l
        JOIN servidor s ON l.fk_servidor = s.id_servidor
        WHERE s.id_servidor = ${idServidor}
        AND s.fk_empresa = (SELECT fk_empresa FROM usuario WHERE id_usuario = ${idUsuario})
        AND l.fk_componente = ${series.componente}
        AND l.fk_metrica IN (${series.serie1}, ${series.serie2})
        AND l.dia_hora >= NOW() - INTERVAL 1 HOUR
        GROUP BY FLOOR(UNIX_TIMESTAMP(l.dia_hora) / 300)
        ORDER BY MIN(l.dia_hora);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKPIs,
    buscarHistorico
};