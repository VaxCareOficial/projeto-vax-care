var database = require("../database/config");

function buscarSensoresExistentes(){
    var instrucaoSql = `select count(idSensor) as qtdSensor from sensor;`
    return database.executar(instrucaoSql);
}

function cadastrarMedidas(fkSensor, temperatura, statusTemperatura) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO dadosSensor (temperatura, dataAtual, statusAlert, fkSensor) VALUES (${temperatura},now(),'${statusTemperatura}', 3);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarSensor(nomeSensor){
    var instrucao = `
        INSERT INTO Sensor (nome) VALUES ('${nomeSensor}');
    `
    return database.executar(instrucao);
}

function editarSensor(nome, idSensor){
    var instrucao = `
        UPDATE Sensor set nome = '${nome}' where idSensor = ${idSensor};
    `

    return database.executar(instrucao);

}


module.exports = {
    buscarSensoresExistentes,
    cadastrarMedidas,
    cadastrarSensor,
    editarSensor
}