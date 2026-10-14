var database = require("../database/config");

function salvar(nome, email, telefone, empresa) {
    var instrucaoSql = `
        INSERT INTO fale_conosco (nome, email, telefone, empresa) 
        VALUES ('${nome}', '${email}', '${telefone}', '${empresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvar
};