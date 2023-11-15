var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});



router.get("/buscarSensores", function (req, res) {
    medidaController.buscarSensoresExistentes(req, res);
})

router.post("/cadastrarMedidas", function (req, res) {
    medidaController.cadastrarMedidas(req, res);
})


router.get("/buscarDados/:searchText", function (req, res) {
    medidaController.buscarDados(req, res);
})


router.get("/buscarEmTempoReal/:searchText", function (req, res) {
    medidaController.buscarEmTempoReal(req, res);
})
module.exports = router;