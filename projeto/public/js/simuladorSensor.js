function simularSensorJogandoDadoNoBanco(){

    fetch(`/medidas/buscarSensores`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                qtdSensores = resposta[0].qtdSensor;

                while(true){
                    var fkSensor = parseInt(Math.random() * qtdSensores + 1);
                    var temperatura = Math.random().toFixed(2);
            
                    fetch("/medidas/cadastrarMedidas", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          // crie um atributo que recebe o valor recuperado aqui
                          // Agora vá para o arquivo routes/usuario.js
                          fkSensorServer: fkSensor,
                          temperaturaServer: temperatura
                        }),
                      })
                        .then(function (resposta) {
                          console.log("resposta: ", resposta);
                  
                          if (resposta.ok) {
                           
                            setTimeout(() => {
                            simularSensorJogandoDadoNoBanco()
                            }, "5000");
                  
                          } else {
                            throw "Houve um erro ao tentar realizar o cadastro!";
                          }
                        })
                        .catch(function (resposta) {
                          console.log(`#ERRO: ${resposta}`);
                        });
                  
                      return false;
                 }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    
}