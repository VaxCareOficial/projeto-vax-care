create database VaxCareBD;
use VaxCareBd;

create table vacina(
idVacina int primary key, 
nome varchar(45),
tempMinima decimal,
tempMaxima decimal);

create table empresa(
idEmpresa int primary key auto_increment,
nomeFantasia varchar(45),
razaoSocial varchar(45),
cnpj char(18)); 

create table sensor(
idSensor int primary key auto_increment,
nome varchar(45));

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45),
senha varchar(45),
tipoUsuario varchar(25),
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa));

create table enderecoFilial(
idEnderecoFilial int primary key auto_increment,
cep char(9),
logradouro varchar(45),
cidade varchar(45),
bairro varchar(45),
complemento varchar(45),
uf char (8),
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa));

create table dadosSensor(
idDadoSensor int primary key auto_increment,
temperatura decimal,
dataAtual datetime,
fkSensor int,
foreign key (fkSensor) references sensor(idSensor));

create table refrigerador(
idRefrigerador int primary key,
fkSensor int,
foreign key (fkSensor) references sensor(idSensor),
fkVacina int,
foreign key (fkVacina) references vacina(idVacina),
fkEnderecoFilial int,
foreign key (fkEnderecoFilial) references enderecoFilial(idEnderecoFilial));

select * from dadosSensor;

insert into vacina values
(1, 'Covid-19', '-15', '-25'), 
(2, 'Gripe', '2', '8'),
(3, 'Tetano', '2', '8'),
(4, 'Febre Amarela', '2', '8'); 

insert into empresa values
(null, 'VacinneCare', 'Vaccine Care Franqueadora LTDA', '26186289000179'),
(null, 'Pfizer', 'Laboratórios Pfizer Ltda', '46070868001998'),
(null, 'Astrazeneca', 'ASTRAZENECA DO BRASIL LTDA', '60318797000100'),
(null, 'Biontech', 'Biontech Solucoes Em Tecnologia LTDA',  '27400744000150'); 

insert into sensor values
(null, 'DHT11-A1'),
(null, 'DHT11-A2'),
(null, 'DHT11-A3'),
(null, 'DHT11-A4'); 

insert into usuario values
(null, 'Mario', 'mariosilva@astrazeneca.com', '$76hf238rB', 'Administrador', 3),
(null, 'Felipe', 'felipe@biontech.com', '!sdh586T', 'Administrador', 4),
(null, 'Gustavo', 'gustavo@pfizer.com', 'HDds234!*', 'Vizualizador', 2),
(null, 'Julia', 'julia@vaccinecare.com', 'Hrfer3412@', 'Vizualizador', 1); 

create table enderecoFilial(
idEnderecoFilial int primary key auto_increment,
cep char(9),
logradouro varchar(45),
cidade varchar(45),
bairro varchar(45),
complemento varchar(45),
uf char (8),
fkEmpresa int,
foreign key (fkEmpresa) references empresa(idEmpresa));

insert into enderecoFilial values
(null, '08780-410', 'Rua Vitório Partênio, 47', 'Mogi das Cruzes', 'Vila Partenio', null, 'SP', 1),
(null, '04717-904', 'Rua Alexandre Dumas, 1860', 'São Paulo', 'Santo Amaro', null, 'SP', 2), 
(null, '06709-000', ' Rodovia Raposo Tavares', 'Moionho Velho', 'Cotia', ' KM 26.9 S/N', 'SP', 3),
(null, '30360-540', 'Rua Eclipse, 171', 'Santa Lucia', 'Belo Horizonte', null, 'MG', 4),
(null, '04717-004', 'Rua Alexandre Dumas, 1711', 'São Paulo', 'Santo Amaro', null, 'SP', 2);

create table dadosSensor(
idDadoSensor int primary key auto_increment,
temperatura decimal,
dataAtual datetime,
fkSensor int,
foreign key (fkSensor) references sensor(idSensor));

insert into dadosSensor values
(null, 4.21, '2023-10-26 14:30:00', 1),
(null, 5.27, '2023-10-26 14:30:03', 2),
(null, 5.01, '2023-10-26 14:30:06', 3),
(null, 8.17, '2023-10-26 14:30:09', 4); 

insert into refrigerador values
(1, 1, 4, 5),
(2, 3, 2, 1),
(3, 2, 3, 4),
(4, 4, 1, 3);

select * from refrigerador join enderecoFilial on fkEnderecoFilial = idEnderecoFilial; 



	








