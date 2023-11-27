var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/buscarSensores", function (req, res) {
    sensorController.buscarSensoresExistentes(req, res);
})

router.post("/cadastrarMedidas", function (req, res) {
    sensorController.cadastrarMedidas(req, res);
})


module.exports = router;