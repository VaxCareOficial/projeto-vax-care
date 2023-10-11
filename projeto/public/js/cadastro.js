var cadastroStep1 = document.querySelector(".line-center-1");
var cadastroStep2 = document.querySelector(".line-center-2");
var cadastroStep3 = document.querySelector(".line-center-3");
var step1 = document.querySelector(".step-1");
var step2 = document.querySelector(".step-2");
var step3 = document.querySelector(".step-3");
var passwordIcon1 = document.querySelector(".password-icon-1");
var passwordIcon2 = document.querySelector(".password-icon-2");

var inputNomeFantasia = document.getElementById("inputNomeFantasia");
var inputRazaoSocial = document.getElementById("inputRazaoSocial");
var inputCnpj = document.getElementById("inputCnpj");
var inputCep = document.getElementById("inputCep");
var inputCidade = document.getElementById("inputCidade");
var inputLogradouro = document.getElementById("inputLogradouro");
var inputBairro = document.getElementById("inputBairro");
var inputUf = document.getElementById("inputUf");
var inputComplemento = document.getElementById("inputComplemento");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");

var nomeFantasia = "";
var razaoSocial = "";
var cnpj = "";
var cep = "";
var cidade = "";
var logradouro = "";
var bairro = "";
var uf = "";
var complemento = "";
var email = "";
var password = "";
var confirmPassword = "";

function getCep(cepNumber) {
    fetch(`https://viacep.com.br/ws/${cepNumber}/json/`)
        .then(res => res.json())
        .then(data => {
            if (!data.erro) {
                cep = data.cep;

                cidade = data.localidade;
                inputCidade.value = data.localidade;

                logradouro = data.logradouro;
                inputLogradouro.value = data.logradouro;

                bairro = data.bairro
                inputBairro.value = data.bairro;

                uf = data.uf;
                inputUf.value = data.uf;

                inputCidade.classList.remove("error");
                inputLogradouro.classList.remove("error");
                inputBairro.classList.remove("error");
                inputUf.classList.remove("error");
            } else {
                cep = "";
                inputCep.value = "Inválido"

                cidade = "";
                inputCidade.value = "";

                logradouro = "";
                inputLogradouro.value = "";

                bairro = "";
                inputBairro.value = "";

                uf = "";
                inputUf.value = "";
            }
        });
}

function validateCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "")
        return false;

    if (cnpj.length != 14)
        return false;

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validateStep1() {
    nomeFantasia = inputNomeFantasia.value;
    razaoSocial = inputRazaoSocial.value;
    cnpj = inputCnpj.value;

    var isCnpjValid = validateCnpj(cnpj);

    if (nomeFantasia == "") {
        inputNomeFantasia.classList.add("error");
    }

    if (razaoSocial == "") {
        inputRazaoSocial.classList.add("error");
    }

    if (!isCnpjValid) {
        inputCnpj.classList.add("error");
    }

    if (nomeFantasia != "" && razaoSocial != "" && cnpj != "") {
        step1.classList.remove("active");
        step2.classList.add("active");
        cadastroStep1.style.display = "none";
        cadastroStep2.style.display = "flex";

        // Deixar o input de CEP com foco.
        inputCep.focus();
    }
}

function removeInputErrorStep1() {
    let isCnpjValid = validateCnpj(inputCnpj.value);

    if (inputNomeFantasia.value != "") {
        inputNomeFantasia.classList.remove("error");
    }

    if (inputRazaoSocial.value != "") {
        inputRazaoSocial.classList.remove("error");
    }

    if (isCnpjValid) {
        inputCnpj.classList.remove("error");
    }
}

function validateStep2() {
    // Expressão Regular (Regular Expression) para validar o CEP.
    var cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    var cepTest = cepRegex.test(cep);

    if (!cepTest) {
        inputCep.classList.add("error");
    }

    if (cidade == "") {
        inputCidade.classList.add("error");
    }

    if (logradouro == "") {
        inputLogradouro.classList.add("error");
    }

    if (bairro == "") {
        inputBairro.classList.add("error");
    }

    if (uf == "") {
        inputUf.classList.add("error");
    }

    if (cepTest && cidade != "" && logradouro != "" && bairro != "" && uf != "") {
        step2.classList.remove("active");
        step3.classList.add("active");
        cadastroStep2.style.display = "none";
        cadastroStep3.style.display = "flex";

        // Deixar o input de e-mail com foco.
        inputEmail.focus();
    }
}

function removeInputErrorStep2() {
    // Expressão Regular (Regular Expression) para validar o CEP.
    var cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    var cepTest = cepRegex.test(inputCep.value);

    if (cepTest) {
        inputCep.classList.remove("error");
    }
}

function validateStep3() {
    // Expressão Regular (Regular Expression) para validar o e-mail.
    var emailRegex = /\S+@\S+\.\S+/;

    email = inputEmail.value;
    password = inputPassword.value;
    confirmPassword = inputConfirmPassword.value;

    var emailTest = emailRegex.test(email);

    if (!emailTest) {
        inputEmail.classList.add("error");
    }

    if (password == "") {
        inputPassword.classList.add("error");
    }

    if (confirmPassword == "") {
        inputConfirmPassword.classList.add("error");
    }

    if (confirmPassword != password) {
        inputConfirmPassword.classList.add("error");
    }

    if (emailTest && password != "" && confirmPassword != "" && password == confirmPassword) {
        alert("Cadastro concluído com sucesso!");

        // Direciona o usuário para a página de Login.
        window.location.href = "login.html";
    }
}

function removeInputErrorStep3() {
    // Expressão Regular (Regular Expression) para validar o e-mail.
    var emailRegex = /\S+@\S+\.\S+/;
    var emailTest = emailRegex.test(inputEmail.value);

    if (emailTest) {
        inputEmail.classList.remove("error");
    }

    if (inputPassword.value != "") {
        inputPassword.classList.remove("error");
    }

    if (inputConfirmPassword.value == inputPassword.value && inputConfirmPassword.value.length >= 1) {
        inputConfirmPassword.classList.remove("error");
    }
}

function toggleEyePassword() {
    if (inputPassword.type == "password") {
        inputPassword.setAttribute("type", "text");
        inputConfirmPassword.setAttribute("type", "text");

        passwordIcon1.src = "assets/svg/visible-password-icon.svg";
        passwordIcon2.src = "assets/svg/visible-password-icon.svg";
    } else {
        inputPassword.setAttribute("type", "password");
        inputConfirmPassword.setAttribute("type", "password");

        passwordIcon1.src = "assets/svg/invisible-password-icon.svg";
        passwordIcon2.src = "assets/svg/invisible-password-icon.svg";
    }
}

// Criar máscara no input de CNPJ
inputCnpj.addEventListener("keypress", () => {
    var inputLength = inputCnpj.value.length;

    if (inputLength == 2 || inputLength == 6) {
        inputCnpj.value += ".";
    } else if (inputLength == 10) {
        inputCnpj.value += "/";
    } else if (inputLength == 15) {
        inputCnpj.value += "-";
    }
});

// Criar máscara no input de CEP
inputCep.addEventListener("keypress", () => {
    var inputLength = inputCep.value.length;

    if (inputLength == 5) {
        inputCep.value += "-";
    }
});

// Adiciona a função de deixar ou não a senha vísivel nos botões dos olhos.
if (passwordIcon1) passwordIcon1.addEventListener("click", toggleEyePassword);
if (passwordIcon2) passwordIcon2.addEventListener("click", toggleEyePassword);