var form = document.querySelector(".line-2");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var loginError = document.querySelector(".login-error");

// Fazer a validação dos inputs.
function validateInput() {
    // Expressão Regular (Regular Expression) utilizado para fazer a validação do e-mail.
    var emailRegex = /\S+@\S+\.\S+/;

    var email = inputEmail.value;
    var emailTest = emailRegex.test(email);
    var password = inputPassword.value;

    if (!emailTest) {
        inputEmail.classList.add("error");
    }

    if (password == "") {
        inputPassword.classList.add("error");
    }

    if (email == "fernando.brandao@sptech.school" && password == "123") {
        // Direciona o usuário para a página de Dashboard.
        window.location.href = "dashboard/dashboard.html";
        
     
    }

    if ((emailTest && email == "fernandobrandao@gmail.com" && password != "123" && password != "") || (emailTest && password != "123" && password != "") || (emailTest && password == "123" && password != "")) {
        loginError.classList.add("active");

        // Coloca um delay de 3 segundos para o elemento sumir da tela.
        setTimeout(() => {
            loginError.classList.remove("active");
        }, 3000);
    }
}

// Remover os erros dos inputs (backgrounds vermelhos).
function removeInputError() {
    // Expressão Regular (Regular Expression) utilizado para fazer a validação do e-mail.
    var emailRegex = /\S+@\S+\.\S+/;

    var email = inputEmail.value;
    var emailTest = emailRegex.test(email);
    var password = inputPassword.value;

    if (emailTest) {
        inputEmail.classList.remove("error");
    }

    if (password != "") {
        inputPassword.classList.remove("error");
    }
}

// Remove a função padrão da tag de form (formulário). Sua função padrão seria enviar o usuário para outra página quando ele clicasse no botão de enviar ou pressionasse a tecla enter ao preencher o formulário.
form.addEventListener("submit", (e) => e.preventDefault());