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

    if (emailTest && password != "") {
        fetch("/empresa/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: password
            })
        }).then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {
                    sessionStorage.setItem("idEmpresa", resposta[0].idEmpresa);
                    sessionStorage.setItem("idUsuario", resposta[0].idUsuario);
                    sessionStorage.setItem("nomeUsuario", resposta[0].nome);
                    sessionStorage.setItem("nomeFantasia", resposta[0].nomeFantasia);
                    sessionStorage.setItem("tipoUsuario", resposta[0].tipoUsuario);
                    window.location.href = "dashboard/dashboard.html";
                })
            } else {
                resposta.text().then(text => {
                    loginError.classList.add("active");
                    loginError.innerHTML = text;

                    setTimeout(() => {
                        loginError.classList.remove("active");
                    }, 3000);
                });
            }
        });
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