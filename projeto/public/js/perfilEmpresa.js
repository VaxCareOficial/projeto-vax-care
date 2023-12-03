function pegarCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(res => {
            res.json().then(res => {
                if (res.erro) {
                    inputCep.value = "Inválido";
                } else {
                    inputLogradouro.value = res.logradouro;
                    inputCidade.value = res.localidade;
                    inputBairro.value = res.bairro;
                    inputUf.value = res.uf;

                    inputLogradouro.setAttribute("disabled", true);
                    inputCidade.setAttribute("disabled", true);
                    inputBairro.setAttribute("disabled", true);
                    inputUf.setAttribute("disabled", true);
                }
            })
        });
}

function mascararCep(cep) {
    var inputLength = cep.value.length;

    if (inputLength == 5) {
        cep.value += "-";
    }
}

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

function cadastrarEndereco() {
    var cep = inputCep.value;
    var isCepValid = (/^[0-9]{5}-[0-9]{3}$/).test(cep);
    var logradouro = inputLogradouro.value;
    var cidade = inputCidade.value;
    var bairro = inputBairro.value;
    var complemento = inputComplemento.value;
    var uf = inputUf.value;

    if (!isCepValid) inputCep.classList.add("error");
    if (logradouro == "") inputLogradouro.classList.add("error");
    if (cidade == "") inputCidade.classList.add("error");
    if (bairro == "") inputBairro.classList.add("error");
    if (uf == "") inputUf.classList.add("error");

    if (isCepValid && logradouro != "" && cidade != "" && bairro != "" && uf != "") {
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

                inputLogradouro.removeAttribute("disabled");
                inputCidade.removeAttribute("disabled");
                inputBairro.removeAttribute("disabled");
                inputUf.removeAttribute("disabled");

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

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}