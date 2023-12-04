var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/listar/:idEmpresa", function (req, res) {
    usuarioController.listar(req, res);
});


router.post("/cadastrar/:idEmpresa/:idEnderecoFilial", function (req, res) {
    usuarioController.cadastrar(req, res);
});

module.exports = router;