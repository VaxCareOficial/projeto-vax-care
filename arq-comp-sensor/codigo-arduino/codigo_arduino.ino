// porta que está sendo usada 
int lm35_pin = A0;
// dados que o sensor etá capturando através dessa porta - varia de 0 a 1023;
// iniciando a variável em 0
int leitura_lm35 = 0;
// criação da variavel que receberá esse dado em °C, e será utilizada como a temperatura real do ambiente;
float temperatura;
// criação da variável que simulará a temperatura do nosso projeto, utilizando a temperatura real;
float temperaturaProjeto;

void setup() {

  // configurações 
  Serial.begin(9600);
  int leitura_lm35 = 0;

}

void loop() {

  int leitura_lm35 = analogRead(lm35_pin);
  // variavel temperatura recebe os dados entre 0 e 1023 que estão sendo capturados, e transforma em °C 
  temperatura = leitura_lm35 * (5.0/1023) * 100;
  // simulando a temperatura do nosso projeto, em cima da temperatura real 
  temperaturaProjeto = temperatura * 0.4834 + (-7.3586);
  // exibindo a temperatura do nosso projeto
  Serial.print(temperaturaProjeto);
  Serial.println("°C");
  delay(1000);

}
