var express = require("express");
var router = express.Router();

var refrigeradorController = require("../controllers/refrigeradorController");

router.get("/buscarRefrigeradores/:idUsuario", function (req, res) {
    refrigeradorController.buscarRefrigeradoresDisponiveis(req, res);
})

router.get("/buscarDados/:searchText/:idUsuario", function (req, res) {
    refrigeradorController.buscarDados(req, res);
});

router.get("/buscarEmTempoReal/:searchText", function (req, res) {
    refrigeradorController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarVacina/:searchText", function (req, res) {
    refrigeradorController.buscarTipoDeVacina(req, res);
})

router.get("/buscarAlertas/:idSensor", function (req, res) {
    refrigeradorController.buscarAlertasDosRefrigeradores(req, res);
})

// Parte da integração

router.get("/buscarQuantidadeAlertas", function (req, res) {
    refrigeradorController.buscarQuantidadeAlertasRefrigerador(req, res);
})

// Parte da integração
router.get("/qtdAlertasPorDia/:idRefrigerador", function (req, res) {
    refrigeradorController.buscarAlertasPorDia(req, res);
})

router.get("/contarRefrigeradoresEmpresa/:idEmpresa", function (req, res) {
    refrigeradorController.contarRefrigeradoresEmpresa(req, res);
})

router.get("/listar/:idEmpresa", function (req, res) {
    refrigeradorController.listar(req, res);
})

router.post("/cadastrar", function (req, res) {
    refrigeradorController.cadastrar(req, res);
})

router.delete("/deletar/:idRefrigerador", function (req, res) {
    refrigeradorController.deletar(req, res);
})


router.get("/ultimoDadoRefrigeradorDisponivel/:idUsuario", function (req, res) {
    refrigeradorController.buscarUltimoDadoPorRefrigerador(req, res);
})


router.get("/statusEtemperaturaUltimoDado/:idDadosSensor", function (req, res) {
    refrigeradorController.buscarStatusTemperaturaUltimoDado(req, res);
})


router.get("/buscarQuantidadePorVacina/:idUsuario", function (req, res) {
    refrigeradorController.buscarQuantidadeVacinaRefrigerador(req, res);
})







module.exports = router;