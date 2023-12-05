function listarUsuario() {
    fetch(`/usuario/listar/${idEmpresa}`)
        .then(res => {
            res.json().then(res => {
                console.log(res); tbodyUsuario.innerHTML = "";
                for (var i = 0; i < res.length; i++) {
                    var nomeFilial = "";
                    if (res[i].nomeFilial == null) {
                        nomeFilial = "Indefinido";
                    } else {
                        nomeFilial = res[i].nomeFilial;
                    }
                    tbodyUsuario.innerHTML += `
                <tr>
                  <td class="td-nome">${res[i].nome}</td>
                  <td class="td-e-mail">${res[i].email}</td>
                  <td class="td-nomeFilial">${nomeFilial}</td>
                  <td class="container-img">
                      <img onclick="deletarUsuario(this)" class="btn-excluir" data-id="${res[i].idUsuario}" src="../assets/svg/trash-icon.svg">
                  </td>
              </tr>
                `
                }
            })
        })
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

                resposta.text().then(resposta => {
                    abrirModal(resposta);
                });
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
                    <option value="${resposta[i].idEnderecoFilial}">${resposta[i].nome}</option>
                    `;
                }
            });
        });
}

function deletarUsuario(btn) {
    var idUsuario = Number(btn.getAttribute('data-id'));

    fetch(`/usuario/deletar/${idUsuario}`, {
        method: "DELETE"
    }).then(res => {
        res.text().then(res => {
            abrirModal(res);
        });
    });
}

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}