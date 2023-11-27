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


module.exports = router;