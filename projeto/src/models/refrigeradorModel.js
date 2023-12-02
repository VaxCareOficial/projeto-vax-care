var database = require("../database/config");



function buscarRefrigeradoresDisponiveis(idUsuario) {

    var instrucaoSql = `select idRefrigerador, idSensor from refrigerador join enderecoFilial on fkEnderecoFilial = idEnderecoFilial join usuario u on idEnderecoFilial = u.fkEnderecoFilial 
    JOIN sensor ON fkSensor = idSensor where idUsuario = ${idUsuario};`
                                
    return database.executar(instrucaoSql);
}



function buscarDados(idRefrigerador, idUsuario, limite_linhas){
    var instrucaoSql = `select 
                        idUsuario, 
                        idRefrigerador, 
                        idSensor, 
                        idDadosSensor, temperatura, DATE_FORMAT(dataAtual, "%d/%m %H:%i:%S") as data, statusAlert
                            from usuario join enderecoFilial on fkEnderecoFilial = idEnderecoFilial 
                                join refrigerador as r on r.fkEnderecoFilial = idEnderecoFilial 
                                    join sensor on fkSensor = idSensor
                                        join dadosSensor ds on ds.fkSensor = idSensor
                                        where idUsuario = ${idUsuario} and idRefrigerador = ${idRefrigerador}
                                        order by idDadosSensor desc limit ${limite_linhas};
    `
                                
    return database.executar(instrucaoSql);
}



function buscarMedidasEmTempoReal(idRefrigerador) {

    var instrucaoSql = `select idDadosSensor, temperatura,  DATE_FORMAT(dataAtual,'%d/%m %H:%i:%s')AS data, statusAlert, ds.fkSensor 
                            from dadosSensor ds join sensor on ds.fkSensor = idSensor 
                            join refrigerador r on idSensor = r.fkSensor
                            where idRefrigerador = ${idRefrigerador}
                            order by idDadosSensor desc limit 1`
                                
    return database.executar(instrucaoSql);
}


function buscarTipoDeVacina(idRefrigerador) {

    var instrucaoSql = `select nome from refrigerador join vacina on fkVacina = idVacina where idRefrigerador = ${idRefrigerador};`
                                
    return database.executar(instrucaoSql);
}


function buscarAlertasDosRefrigeradores(idSensor) {

    var instrucaoSql = `SELECT * FROM sensor JOIN dadosSensor ON idSensor = fkSensor WHERE idSensor = ${idSensor} AND statusAlert IN('Alerta Frio', 'Alerta Calor', 'Crítico Frio', 'Crítico Calor') order by DataAtual Desc LIMIT 1;`
                                
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarRefrigeradoresDisponiveis,
    buscarDados,
    buscarMedidasEmTempoReal,
    buscarTipoDeVacina,
    buscarAlertasDosRefrigeradores
}