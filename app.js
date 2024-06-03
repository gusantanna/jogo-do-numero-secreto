
var listaNumerosSorteados = [];
let numeroLimite = 1000;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}
// function
function exibirMensagemInicial()
{
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'escolha um número entre 1 e 1000');
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
   let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
   let quantidadeElementosLista = listaNumerosSorteados.length;

    if(quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = []; 
    }

   if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
   }
   else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
   }
}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTela = `você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTela);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if (numeroSecreto > chute) {
            exibirTextoNaTela('p', 'número secreto é maior');
        }
        else {
            exibirTextoNaTela('p', 'número secreto é menor');
        }
        tentativas++;
        limparCampo();
    }
}