var database = require("../database/config");

function cadastrar(nome, email, senha, tipoUsuario, idEmpresa, idEnderecoFilial) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, tipoUsuario, fkEmpresa, fkEnderecoFilial) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', ${idEmpresa}, ${idEnderecoFilial});
    `;
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};