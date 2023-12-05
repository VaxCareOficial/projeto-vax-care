var database = require("../database/config");

function autenticar(email, senha) {
    var instrucao = `
    SELECT * FROM usuario JOIN empresa on fkEmpresa = idEmpresa WHERE email = '${email}' AND senha = '${senha}'
    `;
    return database.executar(instrucao);
}

function cadastrar(nomeFantasia, razaoSocial, cnpj) {
    var instrucao = `
      INSERT INTO Empresa (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
  `;
    return database.executar(instrucao);
}

function cadastrarEndereco(nome, cep, logradouro, cidade, bairro, complemento, uf, idEmpresa) {
    var instrucao = `
      INSERT INTO EnderecoFilial (nome, cep, logradouro, cidade, bairro, complemento, uf, fkEmpresa) VALUES ('${nome}', '${cep}', '${logradouro}', '${cidade}', '${bairro}', '${complemento}', '${uf}', ${idEmpresa});
  `;
    return database.executar(instrucao);
}


function gerarEnderecos(idEmpresa) {
    var instrucao = `
    SELECT * FROM EnderecoFilial WHERE fkEmpresa = ${idEmpresa} order by idEnderecoFilial desc;
  `;
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarEndereco,
    gerarEnderecos
};