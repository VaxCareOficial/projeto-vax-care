var refrigeradorModel = require("../models/refrigeradorModel");
var sensorModel = require("../models/sensorModel");
var vacinaModel = require("../models/vacinaModel");


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


function buscarDados(req, res) {

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


function buscarAlertasDosRefrigeradores(req, res) {

    var idSensor = req.params.idSensor;

    console.log(`Recuperando todos os dados dos refrigeradores disponiveis para o usuario logado`);

    refrigeradorModel.buscarAlertasDosRefrigeradores(idSensor).then(function (resultado) {
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

function contarRefrigeradoresEmpresa(req, res) {

    var idEmpresa = req.params.idEmpresa;

    refrigeradorModel.contarRefrigeradoresEmpresa(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
        })
}

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    refrigeradorModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
        });

}

function cadastrar(req, res) {
    var tipoVacina = req.body.tipoVacinaServer;
    var temperaturaMinima = req.body.temperaturaMinimaServer;
    var temperaturaMaxima = req.body.temperaturaMaximaServer;
    var nomeSensor = req.body.nomeSensorServer;
    var filial = req.body.filialServer;

    var ultimoIdVacina = 0;
    var ultimoIdSensor = 0;

    vacinaModel.cadastrar(tipoVacina, temperaturaMinima, temperaturaMaxima)
        .then(function (resultadoVacina) {
            ultimoIdVacina = resultadoVacina.insertId;

            sensorModel.cadastrarSensor(nomeSensor)
                .then(function (resultadoSensor) {
                    ultimoIdSensor = resultadoSensor.insertId;

                    refrigeradorModel.cadastrar(ultimoIdSensor, ultimoIdVacina, filial)
                        .then(function () {
                            res.status(201).send("Refrigerador cadastrado com sucesso!")
                        }).catch(function (error) {
                            console.log(error);
                        })
                }).catch(function (error) {
                    console.log(error);
                })
        }).catch(function (error) {
            console.log(error);
        })
}

function deletar(req, res) {
    var idRefrigerador = req.params.idRefrigerador;

    refrigeradorModel.deletar(idRefrigerador)
        .then(
            function () {
                res.status(201).send("Refrigerador excluído com sucesso!");
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );

}



// Parte da integração

function buscarQuantidadeAlertasRefrigerador(req, res) {


    console.log(`Recuperando todos os dados dos refrigeradores disponiveis para o usuario logado`);

    refrigeradorModel. buscarQuantidadeAlertasRefrigerador().then(function (resultado) {
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


function buscarAlertasPorDia(req, res) {

    var idRefrigerador = req.params.idRefrigerador;

    console.log(`Recuperando todos os dados dos refrigeradores disponiveis para o usuario logado`);

    refrigeradorModel.buscarAlertasPorDia(idRefrigerador).then(function (resultado) {
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
    buscarTipoDeVacina,
    buscarAlertasDosRefrigeradores,
    contarRefrigeradoresEmpresa,
    listar,
    cadastrar,
    deletar,
    buscarQuantidadeAlertasRefrigerador,
    buscarAlertasPorDia
}