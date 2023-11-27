var sensorModel = require("../models/sensorModel");

function buscarSensoresExistentes(req, res){
    
    console.log(`Quantidade de sensores no banco`);

    sensorModel.buscarSensoresExistentes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os sensores.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function cadastrarMedidas(req,res){
    var fkSensor = req.body.fkSensorServer;
    var temperatura = req.body.temperaturaServer;
    var statusTemperatura = req.body.statusServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        sensorModel.cadastrarMedidas(fkSensor, temperatura, statusTemperatura)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}



module.exports = {
    buscarSensoresExistentes,
    cadastrarMedidas
}