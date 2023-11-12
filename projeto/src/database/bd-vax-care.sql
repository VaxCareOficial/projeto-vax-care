CREATE DATABASE bdVaxCare;
USE bdVaxCare;

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
    CONSTRAINT fkEmpresaEndereco FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    tipoUsuario VARCHAR(25),
    CONSTRAINT chkTipoUsuario CHECK (tipoUsuario IN('Administrador', 'Funcionário')),
    fkEmpresa INT,
    CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
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
	idDadosSensor INT PRIMARY KEY AUTO_INCREMENT,
	temperatura DECIMAL(4,2),
	dataAtual TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fkSensor INT,
	CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
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

INSERT INTO Empresa VALUES
(null, 'VacinneCare', 'Vaccine Care Franqueadora LTDA', '26186289000179'),
(null, 'Pfizer', 'Laboratórios Pfizer Ltda', '46070868001998'),
(null, 'Astrazeneca', 'ASTRAZENECA DO BRASIL LTDA', '60318797000100'),
(null, 'Biontech', 'Biontech Solucoes Em Tecnologia LTDA',  '27400744000150');

INSERT INTO EnderecoFilial VALUES
(null, '08780-410', 'Rua Vitório Partênio, 47', 'Mogi das Cruzes', 'Vila Partenio', null, 'SP', 1),
(null, '04717-904', 'Rua Alexandre Dumas, 1860', 'São Paulo', 'Santo Amaro', null, 'SP', 2), 
(null, '06709-000', ' Rodovia Raposo Tavares', 'Moionho Velho', 'Cotia', ' KM 26.9 S/N', 'SP', 3),
(null, '30360-540', 'Rua Eclipse, 171', 'Santa Lucia', 'Belo Horizonte', null, 'MG', 4),
(null, '04717-004', 'Rua Alexandre Dumas, 1711', 'São Paulo', 'Santo Amaro', null, 'SP', 2);

INSERT INTO Usuario VALUES
(null, 'Mario', 'mariosilva@astrazeneca.com', '$76hf238rB', 'Administrador', 3),
(null, 'Felipe', 'felipe@biontech.com', '!sdh586T', 'Administrador', 4),
(null, 'Gustavo', 'gustavo@pfizer.com', 'HDds234!*', 'Funcionário', 2),
(null, 'Julia', 'julia@vaccinecare.com', 'Hrfer3412@', 'Funcionário', 1); 

INSERT INTO Vacina VALUES
(1, 'Covid-19', '-15', '-25'), 
(2, 'Gripe', '2', '8'),
(3, 'Tetano', '2', '8'),
(4, 'Febre Amarela', '2', '8'); 

INSERT INTO Sensor VALUES
(null, 'LM35-A1'),
(null, 'LM35-A2'),
(null, 'LM35-A3'),
(null, 'LM35-A4'); 

INSERT INTO DadosSensor VALUES
(null, 4.21, '2023-10-26 14:30:00', 1),
(null, 5.27, '2023-10-26 14:30:03', 2),
(null, 5.01, '2023-10-26 14:30:06', 3),
(null, 8.17, '2023-10-26 14:30:09', 4); 

INSERT INTO Refrigerador VALUES
(1, 1, 4, 5),
(2, 3, 2, 1),
(3, 2, 3, 4),
(4, 4, 1, 3);

SELECT idRefrigerador, s.nome AS 'Nome do sensor', v.nome AS 'Nome da vacina', em.nomeFantasia AS 'Empresa', e.cep AS 'Cep', e.logradouro AS 'Logradouro', e.cidade AS 'Cidade', e.bairro AS 'Bairro', e.complemento AS 'Complemento', e.uf AS 'UF'
FROM Refrigerador AS r JOIN enderecoFilial AS e ON r.fkEnderecoFilial = e.idEnderecoFilial 
JOIN Vacina AS v ON r.fkVacina = v.idVacina 
JOIN Sensor AS s ON r.fkSensor = s.idSensor 
JOIN Empresa as em ON e.fkEmpresa = em.idEmpresa
WHERE idEmpresa = 2;
