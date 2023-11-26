var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3333;

var app = express();

var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresa");
var usuarioRouter = require("./src/routes/usuario");
var refrigeradorRouter = require("./src/routes/refrigerador");
var vacinaRouter = require("./src/routes/vacina");
var sensorRouter = require("./src/routes/sensor");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/empresa", empresaRouter);
app.use("/usuario", usuarioRouter);
app.use("/refrigerador", refrigeradorRouter);
app.use("/vacina", vacinaRouter);
app.use("/sensor", sensorRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`);
});