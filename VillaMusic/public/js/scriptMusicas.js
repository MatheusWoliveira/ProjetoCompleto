document.addEventListener("DOMContentLoaded", () => {
    const perfil = document.querySelector(".spanOne");

    if (perfil) {
        perfil.addEventListener("click", () => {
            window.location.href = "../perfil/pgPerfil.html"; 
        });
    }
});

