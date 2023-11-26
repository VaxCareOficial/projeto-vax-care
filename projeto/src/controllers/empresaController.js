var empresaModel = require("../models/empresaModel");
var usuarioModel = require("../models/usuarioModel");

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

function cadastrar(req, res) {
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
        empresaModel.cadastrar(nomeFantasia, razaoSocial, cnpj)
            .then(
                function (resultadoEmpresa) {
                    var ultimoIdEmpresa = resultadoEmpresa.insertId;

                    usuarioModel.cadastrar(null, email, senha, tipoUsuario, ultimoIdEmpresa, null)
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

function cadastrarEndereco(req, res) {
    var cep = req.body.cepServer;
    var logradouro = req.body.logradouroServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var complemento = req.body.complementoServer;
    var uf = req.body.ufServer;
    var idEmpresa = req.params.idEmpresa;

    if (cep == "") {
        res.status(400).send("Preencha o campo de CEP.");
    } else if (logradouro == "") {
        res.status(400).send("Preencha o campo de logradouro.");
    } else if (cidade == "") {
        res.status(400).send("Preencha o campo de cidade.");
    } else if (bairro == "") {
        res.status(400).send("Preencha o campo de bairro.");
    } else if (uf == "") {
        res.status(400).send("Preencha o campo de uf");
    } else {
        empresaModel.cadastrarEndereco(cep, logradouro, cidade, bairro, complemento, uf, idEmpresa)
            .then(function () {
                res.status(201).send("Endereço cadastrado com sucesso!");
            }).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function gerarEnderecos(req, res) {
    var idEmpresa = req.params.idEmpresa;

    empresaModel.gerarEnderecos(idEmpresa)
        .then(function (resposta) {
            res.status(200).json(resposta);
        }).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    gerarEnderecos
}