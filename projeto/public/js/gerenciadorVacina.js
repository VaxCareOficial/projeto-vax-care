function cadastrarVacina() {
    var tipoVacina = inputTipoVacina.value;
    var temperaturaMaxima = inputTemperaturaMaxima.value;
    var temperturaMinima = inputTemperaturaMinima.value;

    if (tipoVacina == "") inputTipoVacina.classList.add("error");
    if (temperaturaMaxima == "") inputTemperaturaMaxima.classList.add("error");
    if (temperturaMinima == "") inputTemperaturaMinima.classList.add("error");

    if (tipoVacina != "" && temperaturaMaxima != "" && temperturaMinima != "") {
        fetch("/vacina/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipoVacinaServer: tipoVacina,
                temperaturaMaximaServer: temperaturaMaxima,
                temperturaMinimaServer: temperturaMinima
            })
        }).then(resposta => {
            if (resposta.status == 201) {
                inputTipoVacina.value = "";
                inputTemperaturaMaxima.value = "";
                inputTemperaturaMinima.value = "";

                alert("Vacina cadastrada com sucesso!");
            } else {
                console.log("Houve um problema ao cadastrar a vacina!");
            }
        });
    }
}

function cadastrarRefrigerador() {
    var nomeSensor = inputNomeSensor.value;
    var tipoVacina = selectTipoVacina.value;
    var filial = selectFilial.value;

    if (nomeSensor == "") inputNomeSensor.classList.add("error");
    if (tipoVacina == 0) selectTipoVacina.classList.add("error");
    if (filial == 0) selectFilial.classList.add("error");

    if (nomeSensor != "" && tipoVacina != 0 && filial != 0) {
        fetch("/refrigerador/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeSensorServer: nomeSensor,
                tipoVacinaServer: tipoVacina,
                filialServer: filial
            })
        }).then(resposta => {
            if (resposta.status == 201) {
                inputNomeSensor.value = "";
                selectTipoVacina.value = 0;
                selectFilial.value = 0;

                alert("Refrigerador cadastrado com sucesso!");
            } else {
                console.log("Houve um problema ao cadastrar o refrigerador!");
            }
        });
    }
}

function gerarVacina() {
    selectTipoVacina.innerHTML = `<option value="0">Selecionar</option>`;

    fetch(`/vacina/listar/${idEmpresa}`)
        .then(resposta => {
            resposta.json().then(resposta => {
                for (var i = 0; i < resposta.length; i++) {
                    selectTipoVacina.innerHTML += `
                    <option value="${resposta[i].idVacina}">${resposta[i].nome}</option>
                    `;
                }
            });
        });
}

function gerarEnderecoFilial() {
    selectFilial.innerHTML = `<option value="0">Selecionar</option>`;

    fetch(`/empresa/gerar-enderecos/${idEmpresa}`)
        .then(resposta => {
            resposta.json().then(resposta => {
                for (var i = 0; i < resposta.length; i++) {
                    selectFilial.innerHTML += `
                    <option value="${resposta[i].idEnderecoFilial}">${resposta[i].logradouro}</option>
                    `;
                }
            });
        });
}

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}