var database = require("../database/config")

async function cadastrar(idServidor, idComponente, idEmpresa, idMetrica, valorLimite1, valorLimite2) {
    console.log("ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", );

    //insert em servidor_componente, empresa_componente, componente_metrica, limite valor 1, limite valor 2
    const query1 = `INSERT IGNORE INTO servidor_componente VALUES (${idServidor}, ${idComponente});`
    const query2 = `INSERT IGNORE INTO empresa_componente VALUES (${idEmpresa}, ${idComponente});`
    const query3 = `INSERT IGNORE INTO componente_metrica VALUES (${idComponente}, ${idMetrica});`
    const query4 = `INSERT INTO limite (fk_servidor, fk_componente, fk_metrica, fk_alerta, valor) VALUES (${idServidor}, ${idComponente}, ${idMetrica}, 1, ${valorLimite1})`
    const query5 = `INSERT INTO limite (fk_servidor, fk_componente, fk_metrica, fk_alerta, valor) VALUES (${idServidor}, ${idComponente}, ${idMetrica}, 2, ${valorLimite2})` 

    console.log("Executando querys: \n" + query1 +"\n" + query2 +"\n" + query3 +"\n" + query4 +"\n" + query5)

    try {
    await Promise.all([
        database.executar(query1),
        database.executar(query2),
        database.executar(query3),

        console.log("Tabela pai cadastrada!")
    ]);

    const resultadosLimites = await Promise.all([
            database.executar(query4),
            database.executar(query5)
        ]);

        return resultadosLimites; 
    } 
    catch(erro){
        console.log("Erro Detectado");
        throw erro;
    }
    
    
}


module.exports = {
    cadastrar
}