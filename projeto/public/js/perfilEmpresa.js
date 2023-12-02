function cadastrar() {
    var name = inputName.value;
    var email = inputEmail.value;
    var emailRegex = /\S+@\S+\.\S+/;
    var password = inputPassword.value;
    var confirmPassword = inputConfirmPassword.value;
    var enderecoFilial = selectEnderecoFilial.value;

    var emailTest = emailRegex.test(email);

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

function cadastrarEndereco() {
    var cep = inputCep.value;
    var logradouro = inputLogradouro.value;
    var cidade = inputCidade.value;
    var bairro = inputBairro.value;
    var complemento = inputComplemento.value;
    var uf = inputUf.value;

    if (cep != "" && logradouro != "" && cidade != "" && bairro != "" && uf != "") {
        fetch(`/empresa/cadastrar-endereco/${idEmpresa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cepServer: cep,
                logradouroServer: logradouro,
                cidadeServer: cidade,
                bairroServer: bairro,
                complementoServer: complemento,
                ufServer: uf
            })
        }).then(function (resposta) {
            if (resposta.status == 201) {
                inputCep.value = "";
                inputLogradouro.value = "";
                inputCidade.value = "";
                inputBairro.value = "";
                inputComplemento.value = "";
                inputUf.value = "";

                alert("Endereço cadastrado com sucesso!");
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

function retornarIndex() {
    sessionStorage.clear();
    window.location.href = "../index.html"
}