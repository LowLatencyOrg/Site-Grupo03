var database = require("../database/config");


function listarUsuarios(idEmpresa) {

    var instrucaoSql = `
        SELECT
            id_usuario,
            nome
        FROM usuario
        WHERE fk_empresa = ${Number(idEmpresa)}
        ORDER BY nome;
    `;

    return database.executar(instrucaoSql);
}


function editarUsuario(
    idEmpresa,
    idUsuario,
    cargo,
    senha
) {

    var instrucaoSql = `
        UPDATE usuario
        SET
            fk_cargo = ${Number(cargo)}
            ${senha ? `, senha = '${senha}'` : ""}
        WHERE
            id_usuario = ${Number(idUsuario)}
            AND fk_empresa = ${Number(idEmpresa)};
    `;

    return database.executar(instrucaoSql);
}


module.exports = {
    listarUsuarios,
    editarUsuario
}; 