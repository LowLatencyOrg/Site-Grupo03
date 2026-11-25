var express = require("express");
var router = express.Router();

router.post("/chamados", async function (req, res) {
    var servidor = req.body.servidor;
    var componente = req.body.componente;
    var severidade = req.body.severidade || "Media";
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    if (!servidor || !componente || !titulo) {
        return res.status(400).json({
            erro: "Servidor, componente e título são obrigatórios."
        });
    }

    var auth = Buffer.from(
        `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
    ).toString("base64");

    var payload = {
        fields: {
            project: {
                key: process.env.JIRA_PROJECT_KEY
            },
            summary: `[${severidade}] ${servidor} - ${titulo}`,
            issuetype: {
                name: process.env.JIRA_ISSUE_TYPE
            },
            labels: [
                "low-latency",
                componente.toLowerCase(),
                severidade.toLowerCase()
            ],
            description: {
                type: "doc",
                version: 1,
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text: `Servidor: ${servidor} | Componente: ${componente} | Severidade: ${severidade}`,
                                marks: [{ type: "strong" }]
                            }
                        ]
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text: descricao || "Sem observações técnicas adicionais."
                            }
                        ]
                    }
                ]
            }
        }
    };

    try {
        var response = await fetch(
            `https://${process.env.JIRA_DOMAIN}.atlassian.net/rest/api/3/issue`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${auth}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        var data = await response.json();

        if (!response.ok) {
            console.error("Erro Jira:", JSON.stringify(data));
            return res.status(response.status).json({
                erro: "O Jira recusou a criação do chamado.",
                detalhes: data.errors || data.errorMessages
            });
        }

        return res.status(201).json({
            chave: data.key,
            url: `https://${process.env.JIRA_DOMAIN}.atlassian.net/browse/${data.key}`
        });
    } catch (erro) {
        console.error("Falha de conexão com o Jira:", erro);
        return res.status(500).json({
            erro: "Erro interno ao conectar com a API do Jira."
        });
    }
});

module.exports = router;