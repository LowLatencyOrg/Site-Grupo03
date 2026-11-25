var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

function executarTransacao(callback) {

    var conexao = mysql.createConnection(mySqlConfig);

    return new Promise(function (resolve, reject) {

        conexao.connect(function (erroConexao) {

            if (erroConexao) {
                conexao.end();
                reject(erroConexao);
                return;
            }

            conexao.beginTransaction(function (erroTransacao) {

                if (erroTransacao) {
                    conexao.end();
                    reject(erroTransacao);
                    return;
                }

                function consultar(instrucao) {

                    return new Promise(function (resolveConsulta, rejectConsulta) {

                        conexao.query(instrucao, function (erro, resultado) {

                            if (erro) {
                                rejectConsulta(erro);
                            } else {
                                resolveConsulta(resultado);
                            }

                        });

                    });
                }

                Promise.resolve()
                    .then(function () {
                        return callback(consultar);
                    })
                    .then(function (resultado) {

                        conexao.commit(function (erroCommit) {

                            if (erroCommit) {

                                conexao.rollback(function () {
                                    conexao.end();
                                    reject(erroCommit);
                                });

                            } else {

                                conexao.end();
                                resolve(resultado);

                            }

                        });

                    })
                    .catch(function (erro) {

                        conexao.rollback(function () {
                            conexao.end();
                            reject(erro);
                        });

                    });

            });

        });

    });
}

module.exports = {
    executar,
    executarTransacao
};
