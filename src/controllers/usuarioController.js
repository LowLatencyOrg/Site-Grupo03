var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            fk_empresa: resultadoAutenticar[0].fk_empresa,
                            fk_cargo: resultadoAutenticar[0].fk_cargo
                        });
                        
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkCargo = req.body.fkCargoServer;
    var telefone = req.body.telefoneServer;
    var tipoContato = req.body.tipoContatoServer;

    if (nome == undefined || cpf == undefined || email == undefined || senha == undefined || fkEmpresa == undefined || fkCargo == undefined || telefone == undefined) {
        res.status(400).send("Existem campos undefined no seu formulário!");
        return;
    }

    usuarioModel.cadastrar(nome, cpf, email, senha, fkEmpresa, fkCargo)
        .then(
            function (resultadoUsuario) {
                var idUsuarioGerado = resultadoUsuario.insertId;

                usuarioModel.cadastrarTelefone(telefone, idUsuarioGerado, tipoContato)
                    .then(
                        function (resultadoTelefone) {
                            // Se ambos derem certo, enviamos a resposta de sucesso ao Front-end
                            res.json({
                                usuario: resultadoUsuario,
                                telefone: resultadoTelefone
                            });
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao cadastrar o telefone! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro do usuário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar
}