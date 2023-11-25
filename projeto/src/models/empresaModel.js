var database = require("../database/config");

function autenticar(email, senha) {
    var instrucao = `
        SELECT * FROM Usuario JOIN Empresa ON idEmpresa = fkEmpresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrarEmpresa(nomeFantasia, razaoSocial, cnpj) {
    var instrucao = `
      INSERT INTO Empresa (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
  `;
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, tipoUsuario, idEmpresa) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, tipoUsuario, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', ${idEmpresa});
    `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrarEmpresa,
    cadastrarUsuario
};