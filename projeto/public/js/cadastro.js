var cadastroStep1 = document.querySelector(".line-center-1");
var cadastroStep2 = document.querySelector(".line-center-2");

var circle1 = document.querySelector(".circle-1");
var circle2 = document.querySelector(".circle-2");
var step1 = document.querySelector(".circle-1 .step");
var step2 = document.querySelector(".circle-2 .step");

var passwordIcon1 = document.querySelector(".password-icon-1");
var passwordIcon2 = document.querySelector(".password-icon-2");

var inputNomeFantasia = document.getElementById("inputNomeFantasia");
var inputRazaoSocial = document.getElementById("inputRazaoSocial");
var inputCnpj = document.getElementById("inputCnpj");

var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");

var cadastroError = document.querySelector(".cadastro-error");

var nomeFantasia = "";
var razaoSocial = "";
var cnpj = "";
var email = "";
var password = "";
var confirmPassword = "";

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

// Fazer a validação dos inputs da primeira etapa do cadastro.
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

    if (nomeFantasia != "" && razaoSocial != "" && isCnpjValid) {
        circle2.classList.remove("no-drop");
        step1.classList.remove("active");
        step2.classList.add("active");
        cadastroStep1.style.display = "none";
        cadastroStep2.style.display = "flex";

        // Adiciona o evento de clique na bolinha de próxima etapa, quando o usuário clicar na bolinha, ele irá voltar para a segunda etapa do cadastro.
        circle2.addEventListener("click", () => {
            step1.classList.remove("active");
            step2.classList.add("active");
            cadastroStep1.style.display = "none";
            cadastroStep2.style.display = "flex";
        });

        // Deixar o input de e-mail com foco.
        inputEmail.focus();
    }
}


// Remover os erros dos inputs (backgrounds vermelhos) da primeira etapa do cadastro.
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


// Fazer a validação dos inputs da segunda etapa do cadastro.
function cadastrar() {
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
        fetch("/empresa/cadastrar-empresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeFantasiaServer: nomeFantasia,
                razaoSocialServer: razaoSocial,
                cnpjServer: cnpj,
                emailServer: email,
                senhaServer: password
            })
        }).then(function (resposta) {
            if (resposta.status == 201) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "login.html";
            }
        });
    }
}

// Remover os erros dos inputs (backgrounds vermelhos) da segunda etapa do cadastro.
function removeInputErrorStep2() {
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

// Alterar senha para vísivel ou invisível.
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

// Criar máscara no input de CNPJ.
function maskCnpj() {
    var inputLength = inputCnpj.value.length;

    if (inputLength == 2 || inputLength == 6) {
        inputCnpj.value += ".";
    } else if (inputLength == 10) {
        inputCnpj.value += "/";
    } else if (inputLength == 15) {
        inputCnpj.value += "-";
    }
}

// Remove a função padrão da tag de form (formulário). Sua função padrão seria enviar o usuário para outra página quando ele clicasse no botão de enviar ou pressionasse a tecla enter ao preencher o formulário.
cadastroStep1.addEventListener("submit", (e) => e.preventDefault());
cadastroStep2.addEventListener("submit", (e) => e.preventDefault());

// Adiciona o evento de clique na bolinha de próxima etapa, quando o usuário clicar na bolinha, ele irá voltar para a primeira etapa do cadastro.
circle1.addEventListener("click", () => {
    step2.classList.remove("active");
    step1.classList.add("active");
    cadastroStep2.style.display = "none";
    cadastroStep1.style.display = "flex";
});
