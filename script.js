const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});
document.getElementById("registerBtn").addEventListener("click", function () {
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (name && email && password) {
        localStorage.setItem("registeredName", name);
        localStorage.setItem("registeredPassword", password);
        alert("Registro exitoso");
    } else {
        alert("Por favor completa todos los campos");
    }
});

document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const savedName = localStorage.getItem("registeredName") || "Diego Gutierrez";
    const savedPass = localStorage.getItem("registeredPassword") || "170425";

    if (username === savedName && password === savedPass) {
        alert("Inicio de sesión exitoso");
        window.location.href = "betatwo.html";
    } else {
        alert("Nombre o contraseña incorrectos");
    }
});
