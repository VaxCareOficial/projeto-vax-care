var database = require("../database/config");

function listar(idEmpresa) {
    var instrucao =  `
     SELECT u.nome, email, e.nome as nomeFilial FROM Usuario as u join enderecoFilial as e on u.fkEnderecoFilial = e.idEnderecoFilial  where u.fkEmpresa = ${idEmpresa}; 
`;
return database.executar(instrucao);

}

function cadastrar(nome, email, senha, tipoUsuario, idEmpresa, idEnderecoFilial) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, tipoUsuario, fkEmpresa, fkEnderecoFilial) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', ${idEmpresa}, ${idEnderecoFilial});
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar
};