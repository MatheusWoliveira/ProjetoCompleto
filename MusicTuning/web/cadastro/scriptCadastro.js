//Página de Cadastro

//Funções para validar o formulário

function validarNome() {

    var nomeValido = document.getElementById("nome").value;
    var msgErro = document.getElementById("msg");
    
    msgErro.style.display = "none";

    if (nomeValido.length <= 7){
        msgErro.textContent = "⚠️ Por favor, digite seu nome completo"
        msgErro.style.display = "block";
        document.getElementById("nome").value = "";
        return false;
    } 

    if(nomeValido == ""){
        msgErro.textContent = "⚠️ Digite seu nome"
        document.getElementById("nome").value = "";
        return false;
    } 

    return true;
}

function capturarNumero(){
    var nome = document.getElementById("nome").value;
    var pattern = /\d/;
    var msgErro = document.getElementById("msg");
    
    msgErro.style.display = "none";

    //incompleto
    if (pattern.test(nome)){
        msgErro.textContent = "⚠️ Não pode conter número"
        msgErro.style.display = "block";
        console.log("Digitou número");
        document.getElementById("nome").value = "";
        return false;
    } 

    return true;
}

function validarNumero() { 

    var numeroValido = document.getElementById("numero").value;
    var msgErro = document.getElementById("msg");
    
    msgErro.style.display = "none";

    if (numeroValido.length === 11){
        console.log("número válido");
        return true;
    } else {
        msgErro.textContent = "⚠️ O número que você digitou é inválido! Digite corretamente "
        msgErro.style.display = "block";
        console.log("número inválido");
        document.getElementById("numero").value = ""; 
        return false;
    }
}

function minimoSenha(){

    var minimoCaractere = document.getElementById("senha").value
    var msgErro = document.getElementById("msg");
    
    msgErro.style.display = "none";

    if (minimoCaractere.length < 6){
        msgErro.textContent = "⚠️ Sua senha deve conter no minimo 6 caracteres !"
        msgErro.style.display = "block";
        console.log("Não foi digitado o minimo de números sugeridos");
        document.getElementById("senha").value = "";
        return false;
    } 
        
    return true 
     
}

function verificarSenha(){

    var senha1 = document.getElementById("senha").value;
    var confirmacaoDeSenha = document.getElementById("confirmar-senha").value;
    var msgErro = document.getElementById("msg");
    
    msgErro.style.display = "none";

    if(senha1 != confirmacaoDeSenha){
        msgErro.textContent = "⚠️ As senhas não coincidem";
        msgErro.style.display = "block";
        document.getElementById("confirmar-senha").value = "";
    } 

    return true;
}

// Eventos

document.getElementById("nome").addEventListener("blur", function(){
    validarNome(); 
    capturarNumero();
})

document.getElementById("numero").addEventListener("blur", validarNumero);
document.getElementById("senha").addEventListener("blur", minimoSenha)
document.getElementById("confirmar-senha").addEventListener("blur", verificarSenha)

document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarNumero() || !verificarSenha() || !validarNome() ) {
        event.preventDefault(); // Impede a submissão do formulário
    } 
});


//Conexão com back

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    if(!validarNome() || !capturarNumero() || !validarNome() || !minimoSenha() || !verificarSenha()){
        return
    }
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const telefone = document.getElementById("numero").value;
    const msgErro = document.getElementById("msg").value;

    // Envio dos dados ao backend
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, telefone })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.msg); // Mensagem de sucesso
        window.location.href = '/login/pgLogin.html'; // Redireciona
    } else {
        msgErro.textContent = `❌ ${data.msg}`;
        msgErro.style.display = 'block';
    }
});

