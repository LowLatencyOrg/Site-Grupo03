var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, nome, email, fk_empresa, fk_cargo 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, cpf, email, senha, fkEmpresa, fkCargo) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, cpf, email, senha, fk_empresa, fk_cargo) 
        VALUES ('${nome}', '${cpf}', '${email}', '${senha}', ${fkEmpresa}, ${fkCargo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarTelefone(telefone, idUsuario, idTipoContato) {
    var instrucaoSql = `
        INSERT INTO contato (numero, fk_empresa, fk_usuario, fk_tipo_contato) 
        VALUES ('${telefone}', NULL, ${idUsuario}, ${idTipoContato});
    `;
    
    console.log("Executando a instrução SQL (Contato): \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarTelefone
};
