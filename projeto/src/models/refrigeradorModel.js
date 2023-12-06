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

function contarRefrigeradoresEmpresa(idEmpresa){

    var instrucaoSql = `select count(idRefrigerador) 
    as qtdRefrigerador 
    from Refrigerador 
    as r 
    join enderecoFilial as e on r.fkEnderecoFilial = e.idEnderecoFilial WHERE fkEmpresa = ${idEmpresa};`
                                
    return database.executar(instrucaoSql);
    
}

function listar(idEmpresa){
    var instrucaoSql = `
    select r.idRefrigerador, s.nome as nomeSensor, v.nome as nomeVacina, v.tempMinima, v.tempMaxima, e.nome as nomeFilial from Refrigerador as r join Sensor as s on r.fkSensor = s.idSensor 
	join Vacina as v on r.fkVacina = v.idVacina
		join enderecoFilial as e on r.fkEnderecoFilial = e.idEnderecoFilial where e.fkEmpresa = ${idEmpresa} order by r.idRefrigerador desc;
    `

    return database.executar(instrucaoSql);
}

function cadastrar(idSensor, idVacina, idEnderecoFilial) {

    var instrucaoSql = `INSERT INTO Refrigerador VALUES (null, ${idSensor}, ${idVacina}, ${idEnderecoFilial})`

    return database.executar(instrucaoSql);

}

function deletar(idRefrigerador) {

    var instrucaoSql = `delete from Refrigerador where idRefrigerador = ${idRefrigerador};`

    return database.executar(instrucaoSql);

}

function deletarEnderecoRefrigerador(idEndereco){
    var instrucaoSql = `DELETE FROM refrigerador where fkEnderecoFilial = ${idEndereco};`

    return database.executar(instrucaoSql);
}



// Parte da integração

function buscarQuantidadeAlertasRefrigerador() {

    var instrucaoSql = `select count(idDadosSensor) qtdStatus, idRefrigerador refrigerador from dadosSensor dado join sensor on dado.fkSensor = idSensor join refrigerador refrigerador on idSensor = refrigerador.fkSensor
    where statusAlert like 'Alerta%'
    group by idRefrigerador
    order by qtdStatus desc;`
                                
    return database.executar(instrucaoSql);
}

function buscarAlertasPorDia(idRefrigerador) {

    var instrucaoSql = `
    
    select count(idDadosSensor) qtdStatus, idRefrigerador refrigerador, DATE_FORMAT(dataAtual, "%d/%m") as data, dayname(dataAtual) as diaDaSemana from dadosSensor dado join sensor on dado.fkSensor = idSensor join refrigerador refrigerador on idSensor = refrigerador.fkSensor
    where statusAlert like 'Alerta%' AND idRefrigerador = ${idRefrigerador}
    group by idRefrigerador, data, diaDaSemana;`
                                
    return database.executar(instrucaoSql);
}



function buscarUltimoDadoPorRefrigerador(idUsuario) {

    var instrucaoSql = `
    select max(idDadosSensor) ultimoDado, idRefrigerador refrigerador from dadosSensor join sensor on fkSensor = idSensor join refrigerador r on idSensor = r.fkSensor join enderecoFilial on r.fkEnderecoFilial = idEnderecoFilial join usuario u on u.fkEnderecoFilial = idEnderecoFilial
            where idUsuario = ${idUsuario}
            group by idRefrigerador;`
                                
    return database.executar(instrucaoSql);
}


function buscarStatusTemperaturaUltimoDado(idDadosSensor) {

    var instrucaoSql = `select temperatura, statusAlert from dadosSensor where idDadosSensor = ${idDadosSensor};`
                                
    return database.executar(instrucaoSql);
}




function buscarQuantidadeVacinaRefrigerador(idUsuario) {

    var instrucaoSql = `select count(idRefrigerador) refrigeradores, v.nome vacina from refrigerador r join vacina v on fkVacina = idVacina join enderecoFilial on r.fkEnderecoFilial = idEnderecoFilial join usuario u on u.fkEnderecoFilial = idEnderecoFilial
    where idUsuario = ${idUsuario}
    group by v.nome;`
                                
    return database.executar(instrucaoSql);
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
    deletarEnderecoRefrigerador,
    buscarQuantidadeAlertasRefrigerador,
    buscarAlertasPorDia,
    buscarUltimoDadoPorRefrigerador,
    buscarStatusTemperaturaUltimoDado,
    buscarQuantidadeVacinaRefrigerador
}