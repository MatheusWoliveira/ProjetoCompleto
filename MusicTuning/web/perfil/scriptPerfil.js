document.addEventListener("DOMContentLoaded", () => {
    const logoSvg = document.getElementById("svg");

    if (logoSvg) {
        logoSvg.addEventListener("click", () => {
            window.location.href = "../login/pgLogin.html"; 
        });
    }
});