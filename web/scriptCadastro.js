//Página de Cadastro

//Funções para validar o formulário

function validarNome() {

    var nomeValido = document.getElementById("nome").value;

    if (nomeValido.length <= 7){
        alert("Digite seu nome completo");
        console.log("Não foi digitado o nome completo");
        document.getElementById("nome").value = "";
        return false;
    } else console.log("Digitou o nome completo");

    if(nomeValido == ""){
        alert("Por Favor ! Digite seu nome");
        document.getElementById("nome").value = "";
        console.log("Nome não digitado");
        return false;
    } else {
        console.log("Nome digitado");
    }

    return true;
}

function capturarNumero(){
    var nome = document.getElementById("nome").value;
    var pattern = /\d/;

    //incompleto
    if (pattern.test(nome)){
        alert("Nome inválido !");
        console.log("Digitou número");
        document.getElementById("nome").value = "";
        return false;
    } else {
        console.log("nao digitou número no campo nome");
        return true;
    } 
}

function validarNumero() { 

    var numeroValido = document.getElementById("numero").value;
    var verificarNumero = true;

    if (numeroValido.length === 11){
        console.log("número válido");
        return true;
    } else {
        alert("O número que você digitou é inválido! Digite corretamente");
        console.log("número inválido");
        document.getElementById("numero").value = ""; 
        return false;
    }
}

function minimoSenha(){

    var minimoCaractere = document.getElementById("senha").value

    if (minimoCaractere.length < 6){
        alert("Sua senha deve conter no minimo 6 caracteres ! ");
        console.log("Não foi digitado o minimo de números sugeridos");
        document.getElementById("senha").value = "";
        return false;
    } else {
        console.log("Senha com mínimo de caracteres válida");
        return true 
    }
    
}

function verificarSenha(){

    var senha1 = document.getElementById("senha").value;
    var confirmacaoDeSenha = document.getElementById("confirmar-senha").value;

    if(senha1 != confirmacaoDeSenha){
        document.getElementById("confirmar-senha").value = "";
        console.log("Confirmação de senha errado !");
        return false;
    } else {
        console.log("senha digitado certo !");
    }

    return true;
}

// Eventos

document.getElementById("nome").addEventListener("blur", function(){
    validarNome(); 
    capturarNumero();
})

document.getElementById("numero").addEventListener("submit", function(){
    validarNumero();
});

document.getElementById("senha").addEventListener("blur", function(){
    minimoSenha();
})

document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarNumero() || !verificarSenha() || !validarNome() ) {
        event.preventDefault(); // Impede a submissão do formulário
    } 
});


//Conexão com back

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const telefone = document.getElementById('numero').value;

    if (senha !== confirmarSenha) {
        document.getElementById('msg').textContent = 'As senhas não coincidem';
        return;
    }

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, telefone })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.msg); // Mensagem de sucesso
        window.location.href = 'pgLogin.html'; // Redireciona para a página de login
    } else {
        document.getElementById('msg').textContent = data.msg; // Mensagem de erro
    }
});
