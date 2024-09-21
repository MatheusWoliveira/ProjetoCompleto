document.getElementById('formulario-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-login').value;
    const senha = document.getElementById('senha-login').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Login bem-sucedido');
        window.location.href = 'pgLogado.html'; // Redireciona para uma página protegida
    } else {
        document.getElementById('msg-login').textContent = data.msg; // Mensagem de erro
    }
});
