var database = require("../database/config");

function autenticar(email, senha) {
    var instrucao = `
    SELECT * FROM Usuario JOIN Empresa ON idEmpresa = fkEmpresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrar(nomeFantasia, razaoSocial, cnpj) {
    var instrucao = `
      INSERT INTO Empresa (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
  `;
    return database.executar(instrucao);
}

function cadastrarEndereco(cep, logradouro, cidade, bairro, complemento, uf, idEmpresa) {
    var instrucao = `
      INSERT INTO EnderecoFilial (cep, logradouro, cidade, bairro, complemento, uf, fkEmpresa) VALUES ('${cep}', '${logradouro}', '${cidade}', '${bairro}', '${complemento}', '${uf}', ${idEmpresa});
  `;
    return database.executar(instrucao);
}


function gerarEnderecos(idEmpresa) {
    var instrucao = `
    SELECT * FROM EnderecoFilial WHERE fkEmpresa = ${idEmpresa};
  `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    gerarEnderecos
};