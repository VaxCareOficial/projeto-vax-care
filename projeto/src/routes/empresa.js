var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/autenticar", function (req, res) {
    empresaController.autenticar(req, res);
});

router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
});

router.post("/cadastrar-endereco/:idEmpresa", function (req, res) {
    empresaController.cadastrarEndereco(req, res);
});

router.get("/gerar-endereco/:idEmpresa", function (req, res) {
    empresaController.gerarEnderecos(req, res);
});


module.exports = router;