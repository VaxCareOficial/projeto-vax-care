var refrigeradorModel = require("../models/refrigeradorModel");


function buscarRefrigeradoresDisponiveis(req, res) {

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando todos os refrigeradores disponiveis para o usuário logado`);

    refrigeradorModel.buscarRefrigeradoresDisponiveis(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarDados(req, res){

    const limite_linhas = 5;

    var idRefrigerador = req.params.searchText;
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando refrigerador por id`);

    refrigeradorModel.buscarDados(idRefrigerador, idUsuario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idRefrigerador = req.params.searchText;

    console.log(`Recuperando medidas em tempo real`);

    refrigeradorModel.buscarMedidasEmTempoReal(idRefrigerador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarTipoDeVacina(req, res) {

    var idRefrigerador = req.params.searchText;

    console.log(`Recuperando medidas em tempo real`);

    refrigeradorModel.buscarTipoDeVacina(idRefrigerador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    buscarRefrigeradoresDisponiveis,
    buscarDados,
    buscarMedidasEmTempoReal,
    buscarTipoDeVacina
}