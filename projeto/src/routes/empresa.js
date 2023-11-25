var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/autenticar", function (req, res) {
    empresaController.autenticar(req, res);
});

router.post("/cadastrar-empresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

module.exports = router;