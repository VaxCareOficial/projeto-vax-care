var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    usuarioModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            })
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUsuario = "Funcionário";
    var idEmpresa = req.params.idEmpresa;
    var idEnderecoFilial = req.params.idEnderecoFilial;

    if (nome == "") {
        res.status(400).send("Preencha o campo de nome.");
    } else if (email == "") {
        res.status(400).send("Preencha o campo de e-mail.");
    } else if (senha == "") {
        res.status(400).send("Preencha o campo de senha.");
    } else {
        usuarioModel.cadastrar(nome, email, senha, tipoUsuario, idEmpresa, idEnderecoFilial)
            .then(
                function () {
                    res.status(201).send("Usuário cadastrado com sucesso!");
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletar(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.deletar(idUsuario)
        .then(
            function () {
                res.status(200).send("Usuário excluído com sucesso!");
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    cadastrar,
    deletar
}