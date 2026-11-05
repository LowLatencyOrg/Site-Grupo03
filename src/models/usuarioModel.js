var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, nome, email, senha, fk_empresa, fk_cargo 
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


module.exports = {
    autenticar,
    cadastrar,
    
};
