var database = require("../database/config");

function listar(idEmpresa) {
    var instrucao =  `
     SELECT u.idUsuario, u.nome, email, e.nome as nomeFilial FROM Usuario as u left join enderecoFilial as e on u.fkEnderecoFilial = e.idEnderecoFilial  where u.fkEmpresa = ${idEmpresa} ORDER BY u.idUsuario DESC; 
`;
return database.executar(instrucao);

}

function cadastrar(nome, email, senha, tipoUsuario, idEmpresa, idEnderecoFilial) {
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, tipoUsuario, fkEmpresa, fkEnderecoFilial) VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', ${idEmpresa}, ${idEnderecoFilial});
    `;
    return database.executar(instrucao);
}

function deletar(idUsuario){
    var instrucao = `
    DELETE FROM Usuario where idUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function atualizarEnderecoUsuario(idEndereco){
    var instrucao = `
    UPDATE usuario SET fkEnderecoFilial = null where fkEnderecoFilial = ${idEndereco};
    `;
    return database.executar(instrucao);

}

module.exports = {
    listar,
    cadastrar,
    deletar,
    atualizarEnderecoUsuario
};