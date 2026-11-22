var database = require("../database/config");

function listarUsuarios(idEmpresa) {

    var instrucaoSql = `
        SELECT
            id_usuario,
            nome
        FROM usuario
        WHERE fk_empresa = ${idEmpresa}
        AND ativo = TRUE
        ORDER BY nome;
    `;

    return database.executar(instrucaoSql);
}

function buscarUsuarioPorId(idUsuario) {

    var instrucaoSql = `
        SELECT
            id_usuario,
            nome,
            cpf,
            email,
            ativo
        FROM usuario
        WHERE id_usuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

function excluirUsuario(idUsuario, idEmpresa) {

    var instrucaoSql = `
        UPDATE usuario
        SET ativo = FALSE
        WHERE id_usuario = ${idUsuario}
        AND fk_empresa = ${idEmpresa}
        AND ativo = TRUE;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarUsuarios,
    buscarUsuarioPorId,
    excluirUsuario
};
