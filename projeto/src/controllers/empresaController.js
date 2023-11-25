var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == "") {
        res.status(400).send("Preencha o campo de e-mail.");
    } else if (senha == "") {
        res.status(400).send("Preencha o campo de senha.");
    } else {
        empresaModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)!");
                    } else {
                        res.status(200).json(resultado);
                    }
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarEmpresa(req, res) {
    var nomeFantasia = req.body.nomeFantasiaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = "Administrador";

    if (nomeFantasia == "") {
        res.status(400).send("Preencha o campo de nome fantasia.");
    } else if (razaoSocial == "") {
        res.status(400).send("Preencha o campo de razão social.");
    } else if (cnpj == "") {
        res.status(400).send("Preencha o campo de CNPJ.");
    } else if (email == "") {
        res.status(400).send("Preencha o campo de e-mail.");
    } else if (senha == "") {
        res.status(400).send("Preencha o campo de senha.");
    } else {

        empresaModel.cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj)
            .then(
                function (resultadoEmpresa) {
                    var ultimoIdEmpresa = resultadoEmpresa.insertId;

                    empresaModel.cadastrarUsuario(null, email, senha, tipoUsuario, ultimoIdEmpresa)
                        .then(
                            function () {
                                res.status(201).send("Cadastro realizado com sucesso!");
                            }
                        ).catch(
                            function (erro) {
                                res.status(500).json(erro.sqlMessage);
                            }
                        );
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrarEmpresa
}