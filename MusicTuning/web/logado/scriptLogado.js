document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const logoSvg = document.getElementById("svg");

    if (logoSvg) {
        logoSvg.addEventListener("click", () => {
            window.location.href = "../login/pgLogin.html"; 
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const perfil = document.querySelector(".spanOne");

    if (perfil) {
        perfil.addEventListener("click", () => {
            window.location.href = "../perfil/pgPerfil.html"; 
        });
    }
});
