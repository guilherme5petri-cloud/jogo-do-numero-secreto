let listaNumerosJaChutados = [];
let maximoDaLista = 100;

// Variável para armazenar o número secreto
let numeroSecreto = criarNumeroSecreto();

// Variável para contar o número de tentativas
let tentativas = 1;

// Função para exibir texto na tela
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 0.6; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
} 

 function exibirMensagemNaTela(){
    exibirTextoNaTela("h1","jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${maximoDaLista}`);
 }
exibirMensagemNaTela();

// Função para verificar o chute do jogador
function verificarChute(){
    let chute = document.querySelector("input").value;
    if(Number(chute) === numeroSecreto){
        exibirTextoNaTela("h1","acertou");
        let palavraTentativas =  tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela("p",`Parabéns! Você acertou o número secreto em ${tentativas} ${palavraTentativas}!`);
 
        // faz com que o botao "novo jogo" seja Habilitado quando voce acerta
        document.getElementById('reiniciar').removeAttribute("disabled");
    } else{
         if(Number(chute) > numeroSecreto){
            exibirTextoNaTela("p","O número secreto é menor!");
        } else{
            exibirTextoNaTela("p","O número secreto é maior!");
        }
        tentativas++;
        limparCampo();
    }
    
}
// Função para limpar o campo de entrada do chute
function limparCampo(){
   let chute = document.querySelector("input");
    chute.value = "";
}

// Função para criar um número secreto aleatório entre 1 e 10
function criarNumeroSecreto() {
  let numerosSorteados = parseInt(Math.random() * maximoDaLista + 1);
  let quantidadeDeNumerosJaChutados = listaNumerosJaChutados.length;
  if(quantidadeDeNumerosJaChutados >= maximoDaLista){
      listaNumerosJaChutados = [];
  }

    if(listaNumerosJaChutados.includes(numerosSorteados)){  
        return criarNumeroSecreto();
    }else{
        listaNumerosJaChutados.push(numerosSorteados);
        console.log(listaNumerosJaChutados);
        return numerosSorteados;     
 }
}

function reiniciarJogo(){
    numeroSecreto = criarNumeroSecreto();
    exibirMensagemNaTela();
    tentativas = 1;
    limparCampo();
    document.getElementById("reiniciar").setAttribute("disabled","true");
}
