const line1Title = document.querySelector(".column-1 .line-1");
const containerPrincipal = document.querySelectorAll(".container-principal");
const containerSensor = document.querySelectorAll(".container-sensor");
const inputSearch = document.getElementById("inputSearch");
const imgInput = document.getElementById("imgInput");

let proximaAtualizacao;


function cleanSearch() {
    inputSearch.value = "";
    line1Title.innerHTML = "<h1>Bem-vindo, <span>Pfizer</span></h1>";
    imgInput.src = "../assets/svg/search-icon.svg";
    imgInput.classList.remove("active");
    containerPrincipal.forEach((e) => e.style.display = "flex");
    containerSensor.forEach((e) => e.style.display = "none");
}

const graficoVariacao= document.getElementById('grafico_variacao_temperatura');



function searchSensor(myChart) {

    let searchText = inputSearch.value;
   

    if (searchText != "") {
        line1Title.innerHTML = "<h1>Painel de controle <span>detalhado</span></h1>";
        imgInput.src = "../assets/svg/x-icon.svg";
        imgInput.classList.add("active");
        containerPrincipal.forEach((e) => e.style.display = "none");
        containerSensor.forEach((e) => e.style.display = "flex");

       
        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        // searchText é o que será digitado na barra de pesquisa e quem será levado como parâmetro 

        fetch(`/medidas/buscarDados/${searchText}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, searchText);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });


    } else {
        cleanSearch();
    }
}


function plotarGrafico(resposta, searchText) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "buscarDados" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.datas);
        dados.datasets[0].data.push(registro.temperatura);
        
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`grafico_variacao_temperatura`),
        config
    );

    setTimeout(() => atualizarGrafico(searchText, dados, myChart), 2000);
}


function atualizarGrafico(searchText, dados, myChart) {



    fetch(`/medidas/buscarEmTempoReal/${searchText}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados(searchText);
                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                
                

                // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                // avisoCaptura.innerHTML = ""


                if (novoRegistro[0].datas == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].datas)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")

                    ultima_temperatura.innerHTML = novoRegistro[0].temperatura;
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].datas); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de umidade

                    ultima_temperatura.innerHTML = novoRegistro[0].temperatura;

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(searchText, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(searchText, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}



inputSearch.addEventListener("input", searchSensor);
imgInput.addEventListener("click", cleanSearch);

function retornarIndex(){
    sessionStorage.clear();
    window.location.href = "../index.html"
}











