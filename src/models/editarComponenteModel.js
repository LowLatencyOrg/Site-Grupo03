
var database = require("../database/config");

function listarServidores(idEmpresa) {

    var instrucaoSql = `
        SELECT
            id_servidor,
            hostname
        FROM servidor
        WHERE fk_empresa = ${Number(idEmpresa)};
    `;

    return database.executar(instrucaoSql);
}


function buscarServidorPorId(idServidor) {

    var instrucaoSql = `
        SELECT
            s.id_servidor,
            s.hostname
        FROM servidor s
        WHERE s.id_servidor = ${Number(idServidor)};
    `;

    return database.executar(instrucaoSql);
}


// Buscar valores de alerta e crítico
function buscarLimites(
    idEmpresa,
    idServidor,
    idComponente,
    idMetrica
) {

    var instrucaoSql = `
        SELECT
            MAX(
                CASE
                    WHEN LOWER(a.descricao) LIKE '%crít%'
                    THEN l.valor
                END
            ) AS valor_critico,

            MAX(
                CASE
                    WHEN LOWER(a.descricao) LIKE '%aten%'
                      OR (
                          LOWER(a.descricao) LIKE '%alert%'
                          AND LOWER(a.descricao) NOT LIKE '%crít%'
                      )
                    THEN l.valor
                END
            ) AS valor_alerta

        FROM limite l

        INNER JOIN alerta a
            ON a.id_alerta = l.fk_alerta

        INNER JOIN servidor s
            ON s.id_servidor = l.fk_servidor

        WHERE
            s.fk_empresa = ${Number(idEmpresa)}
            AND l.fk_servidor = ${Number(idServidor)}
            AND l.fk_componente = ${Number(idComponente)}
            AND l.fk_metrica = ${Number(idMetrica)};
    `;

    return database.executar(instrucaoSql);
}


// Atualizar valores
function editarLimites(
    idEmpresa,
    idServidor,
    idComponente,
    idMetrica,
    valorAlerta,
    valorCritico
) {

    var instrucaoSql = `
        UPDATE limite l

        INNER JOIN servidor s
            ON s.id_servidor = l.fk_servidor

        INNER JOIN alerta a
            ON a.id_alerta = l.fk_alerta

        SET
            l.valor = CASE

                WHEN LOWER(a.descricao) LIKE '%crít%'
                    THEN ${valorCritico}

                ELSE ${valorAlerta}

            END

        WHERE
            s.fk_empresa = ${Number(idEmpresa)}
            AND l.fk_servidor = ${Number(idServidor)}
            AND l.fk_componente = ${Number(idComponente)}
            AND l.fk_metrica = ${Number(idMetrica)}
            AND (
                LOWER(a.descricao) LIKE '%crít%'
                OR LOWER(a.descricao) LIKE '%aten%'
                OR LOWER(a.descricao) LIKE '%alert%'
            );
    `;

    return database.executar(instrucaoSql);
}


module.exports = {
    listarServidores,
    buscarServidorPorId,
    buscarLimites,
    editarLimites
};
