var nav = document.querySelector(".nav");

var inputQtdVacina = document.getElementById("inputQtdVacina");
var inputQtdRefrigerador = document.getElementById("inputQtdRefrigerador");
var inputPrecoVacina = document.getElementById("inputPrecoVacina");

var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputSubject = document.getElementById("inputSubject");
var textareaMessage = document.getElementById("textareaMessage");

function changeNav() {
    // Adiciona a classe "active" no elemento nav assim que o usuário rolar a página.
    nav.classList.toggle("active", scrollY > 0);
}

function simulateFinance() {
    var qtdVacina = inputQtdVacina.value;
    var qtdRefrigerador = inputQtdRefrigerador.value;
    var precoVacina = inputPrecoVacina.value;

    if (qtdVacina == "") {
        inputQtdVacina.classList.add("error");
    }

    if (qtdRefrigerador == "") {
        inputQtdRefrigerador.classList.add("error");
    }

    if (precoVacina == "") {
        inputPrecoVacina.classList.add("error");
    }

    if (qtdVacina != "" && qtdRefrigerador != "" && precoVacina != "") {

    }
}

function removeSimulatorInputError() {
    var qtdVacina = inputQtdVacina.value;
    var qtdRefrigerador = inputQtdRefrigerador.value;
    var precoVacina = inputPrecoVacina.value;

    if (qtdVacina != "") {
        inputQtdVacina.classList.remove("error");
    }

    if (qtdRefrigerador != "") {
        inputQtdRefrigerador.classList.remove("error");
    }

    if (precoVacina != "") {
        inputPrecoVacina.classList.remove("error");
    }
}

function validateContactInput() {
    // Expressão Regular (Regular Expression) utilizado para fazer a validação do e-mail.
    var emailRegex = /\S+@\S+\.\S+/;

    var name = inputName.value;
    var email = inputEmail.value;
    var emailTest = emailRegex.test(email);
    var subject = inputSubject.value;
    var message = textareaMessage.value;

    if (name == "") {
        inputName.classList.add("error");
    }

    if (!emailTest) {
        inputEmail.classList.add("error");
    }

    if (subject == "") {
        inputSubject.classList.add("error");
    }

    if (message == "") {
        textareaMessage.classList.add("error");
    }

    if (name != "" && emailTest && subject != "" && message != "") {
        inputName.value = "";
        inputEmail.value = "";
        inputSubject.value = "";
        textareaMessage.value = "";
        alert("Mensagem enviada com sucesso!");
    }
}

function removeContactInputError() {
    // Expressão Regular (Regular Expression) utilizado para fazer a validação do e-mail.
    var emailRegex = /\S+@\S+\.\S+/;

    var name = inputName.value;
    var email = inputEmail.value;
    var emailTest = emailRegex.test(email);
    var subject = inputSubject.value;
    var message = textareaMessage.value;

    if (name != "") {
        inputName.classList.remove("error");
    }

    if (emailTest) {
        inputEmail.classList.remove("error");
    }

    if (subject != "") {
        inputSubject.classList.remove("error");
    }

    if (message != "") {
        textareaMessage.classList.remove("error");
    }
}

// Adiciona função que altera a nav na página em si.
window.addEventListener("scroll", changeNav);