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
        WHERE s.id_servidor = ${Number(idServidor)};
    `;

    return database.executar(instrucaoSql);
}

function excluirServidor(idServidor, idEmpresa) {

    return database.executarTransacao(function (consultar) {
        var instrucaoVerificar = `
            SELECT id_servidor
            FROM servidor
            WHERE id_servidor = ${Number(idServidor)}
            AND fk_empresa = ${Number(idEmpresa)};
        `;

        return consultar(instrucaoVerificar)
            .then(function (servidores) {

                if (servidores.length === 0) {
                    var erro = new Error("Servidor não encontrado.");
                    erro.codigo = "SERVIDOR_NAO_ENCONTRADO";
                    throw erro;
                }

    
                return consultar(`
                    DELETE FROM leitura
                    WHERE fk_servidor = ${Number(idServidor)};
                `);

            })
            .then(function () {

                return consultar(`
                    DELETE FROM limite
                    WHERE fk_servidor = ${Number(idServidor)};
                `);

            })
            .then(function () {

                return consultar(`
                    DELETE FROM servidor_componente_metrica
                    WHERE fk_servidor = ${Number(idServidor)};
                `);

            })
            .then(function () {

                return consultar(`
                    DELETE FROM servidor_componente
                    WHERE fk_servidor = ${Number(idServidor)};
                `);

            })
            .then(function () {

                return consultar(`
                    DELETE FROM servidor
                    WHERE id_servidor = ${Number(idServidor)}
                    AND fk_empresa = ${Number(idEmpresa)};
                `);

            });

    });
}

module.exports = {
    listarServidores,
    buscarServidorPorId,
    excluirServidor
};