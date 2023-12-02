CREATE DATABASE bdVaxCare;
USE bdVaxCare;

drop database bdvaxcare;

CREATE USER 'vaxcare'@'localhost' IDENTIFIED BY 'vaxcare123';
GRANT ALL PRIVILEGES ON bdVaxCare.* TO 'vaxcare'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	nomeFantasia VARCHAR(45),
	razaoSocial VARCHAR(45),
	cnpj CHAR(18)
);

CREATE TABLE EnderecoFilial (
	idEnderecoFilial INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(9),
    logradouro VARCHAR(45),
    cidade VARCHAR(45),
    bairro VARCHAR(45),
    complemento VARCHAR(45),
    uf CHAR(2),
    fkEmpresa INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
) AUTO_INCREMENT = 1000;

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    tipoUsuario VARCHAR(25),
    CONSTRAINT chkTipoUsuario CHECK (tipoUsuario IN('Administrador', 'Funcionário')),
    fkEnderecoFilial INT,
    CONSTRAINT fkEnderecoFilialUsuario FOREIGN KEY (fkEnderecoFilial) REFERENCES EnderecoFilial(idEnderecoFilial),
    fkEmpresa INT,
    CONSTRAINT fk_Empresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Vacina (
	idVacina INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	tempMinima DECIMAL(4,2),
	tempMaxima DECIMAL(4,2)
);

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45)
);

CREATE TABLE DadosSensor (
	idDadosSensor INT AUTO_INCREMENT,
	temperatura DECIMAL(4,2),
	dataAtual TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statusAlert VARCHAR(45),
	fkSensor INT,
	CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
    PRIMARY KEY(idDadosSensor, fkSensor)
);

CREATE TABLE Refrigerador (
	idRefrigerador INT PRIMARY KEY AUTO_INCREMENT,
	fkSensor INT,
	CONSTRAINT fkSensorRefrigerador FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
	fkVacina INT,
	CONSTRAINT fkVacinaRefrigerador FOREIGN KEY (fkVacina) REFERENCES Vacina(idVacina),
	fkEnderecoFilial INT,
	CONSTRAINT fkEnderecoFilial FOREIGN KEY (fkEnderecoFilial) REFERENCES EnderecoFilial(idEnderecoFilial)
);


-- Script de Inserção

INSERT INTO Empresa (idEmpresa, nomeFantasia, razaoSocial, cnpj) VALUES
(null, 'VacinneCare', 'Vaccine Care Franqueadora LTDA', '26186289000179'),
(null, 'Pfizer', 'Laboratórios Pfizer Ltda', '46070868001998'),
(null, 'Astrazeneca', 'ASTRAZENECA DO BRASIL LTDA', '60318797000100'),
(null, 'Biontech', 'Biontech Solucoes Em Tecnologia LTDA',  '27400744000150');

INSERT INTO EnderecoFilial (idEnderecoFilial, cep, logradouro, cidade, bairro, complemento, uf, fkEmpresa) VALUES
(null, '08780-410', 'Rua Vitório Partênio, 47', 'Mogi das Cruzes', 'Vila Partenio', null, 'SP', 1),
(null, '04717-904', 'Rua Alexandre Dumas, 1860', 'São Paulo', 'Santo Amaro', null, 'SP', 2), 
(null, '06709-000', ' Rodovia Raposo Tavares', 'Moionho Velho', 'Cotia', ' KM 26.9 S/N', 'SP', 3),
(null, '30360-540', 'Rua Eclipse, 171', 'Santa Lucia', 'Belo Horizonte', null, 'MG', 4),
(null, '04717-004', 'Rua Alexandre Dumas, 1711', 'São Paulo', 'Santo Amaro', null, 'SP', 2);

-- Comando de select, para verificar os endereços de cada empresa
select * from empresa join enderecoFilial on idEmpresa = fkEmpresa;

select * from empresa;

INSERT INTO Usuario (idUsuario, nome, email, senha, tipoUsuario, fkEnderecoFilial, fkEmpresa) VALUES
(null, 'Mario', 'mariosilva@astrazeneca.com', '$76hf238rB', 'Administrador', 1002, 3),
(null, 'Felipe', 'felipe@biontech.com', '!sdh586T', 'Administrador', 1003, 4),
(null, 'Gustavo', 'gustavo@pfizer.com', 'HDds234!*', 'Funcionário', 1001, 2),
(null, 'Julia', 'julia@vaccinecare.com', 'Hrfer3412@', 'Funcionário', 1000, 1); 

INSERT INTO Vacina VALUES
(1, 'Covid-19', '2', '8'), 
(2, 'Pentavalente', '2', '8'),
(3, 'Tetano', '2', '8'),
(4, 'Febre Amarela', '2', '8'); 

INSERT INTO Sensor VALUES
(null, 'LM35-A1'),
(null, 'LM35-A2'),
(null, 'LM35-A3'),
(null, 'LM35-A4'),
(null, 'LM35-A5'),
(null, 'LM35-A6'),
(null, 'LM35-A7'); 

INSERT INTO Refrigerador (idRefrigerador, fkSensor, fkVacina, fkEnderecoFilial) VALUES
(null, 1, 4, 1000),
(null, 2, 2, 1001),
(null, 3, 3, 1002),
(null, 4, 1, 1003),
(null, 5, 1,1003),
(null, 6, 2, 1003),
(null, 7, 4, 1003);

select * from refrigerador join enderecoFilial on fkEnderecoFilial = idEnderecoFilial;

SELECT idRefrigerador, s.nome AS 'Nome do sensor', v.nome AS 'Nome da vacina', em.nomeFantasia AS 'Empresa', e.cep AS 'Cep', e.logradouro AS 'Logradouro', e.cidade AS 'Cidade', e.bairro AS 'Bairro', e.complemento AS 'Complemento', e.uf AS 'UF'
FROM Refrigerador AS r JOIN enderecoFilial AS e ON r.fkEnderecoFilial = e.idEnderecoFilial 
JOIN Vacina AS v ON r.fkVacina = v.idVacina 
JOIN Sensor AS s ON r.fkSensor = s.idSensor 
JOIN Empresa as em ON e.fkEmpresa = em.idEmpresa
WHERE idEmpresa = 2;


-- insert teste para a dashboard

insert into sensor (idSensor, nome)values 
(null, 'teste'),
(null, 'teste2');

select * from sensor;

insert into refrigerador (idRefrigerador, fkSensor, fkVacina, fkEnderecoFilial) values 
(null, 8, 1, 1000),
(null, 9, 3, 1000);