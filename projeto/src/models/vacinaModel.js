var database = require("../database/config");


function cadastrar(nome, tempMinima, tempMaxima) {

    var instrucao = `
        INSERT INTO vacina (nome, tempMinima, tempMaxima) VALUES ('${nome}', ${tempMinima}, ${tempMaxima});

    `;
    return database.executar(instrucao);

}

function editar(nome, tempMinima, tempMaxima, idVacina) {

    var instrucao = `
        UPDATE vacina set nome = '${nome}', tempMinima = ${tempMinima}, tempMaxima = ${tempMaxima} where idVacina = ${idVacina};
    `
    return database.executar(instrucao);
    

}

module.exports = {
    
    cadastrar,
    editar
   
}