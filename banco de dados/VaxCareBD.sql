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
