function cadastrarUsuario() {
    var name = inputName.value;
    var email = inputEmail.value;
    var emailRegex = /\S+@\S+\.\S+/;
    var password = inputPassword.value;
    var confirmPassword = inputConfirmPassword.value;
    var enderecoFilial = selectEnderecoFilial.value;

    var emailTest = emailRegex.test(email);

    if (name == "") inputName.classList.add("error");
    if (!emailTest) inputEmail.classList.add("error");
    if (password == "") inputPassword.classList.add("error");
    if (confirmPassword == "") inputConfirmPassword.classList.add("error");
    if (password != confirmPassword) inputConfirmPassword.classList.add("error");
    if (enderecoFilial == 0) selectEnderecoFilial.classList.add("error");

    if (name != "" && emailTest && password != "" && confirmPassword != "" && password == confirmPassword && enderecoFilial != 0) {
        fetch(`/usuario/cadastrar/${idEmpresa}/${enderecoFilial}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: name,
                emailServer: email,
                senhaServer: password
            })
        }).then(function (resposta) {
            if (resposta.status == 201) {
                inputName.value = "";
                inputEmail.value = "";
                inputPassword.value = "";
                inputConfirmPassword.value = "";
                selectEnderecoFilial.value = 0;

                alert("Usuário cadastrado com sucesso!");
            }
        });
    }
}

function gerarEnderecoFilial() {
    selectEnderecoFilial.innerHTML = `<option value="0">Selecionar</option>`;

    fetch(`/empresa/gerar-enderecos/${idEmpresa}`)
        .then(resposta => {
            resposta.json().then(resposta => {
                for (var i = 0; i < resposta.length; i++) {
                    selectEnderecoFilial.innerHTML += `
                    <option value="${resposta[i].idEnderecoFilial}">${resposta[i].logradouro}</option>
                    `;
                }
            });
        });
}

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}