// Función registro validado
(function regValidado() {
  const button = document.getElementById("logBtn");

  button.addEventListener("click", function (event) {
    event.preventDefault();
    if (validacionReg()) {
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      if (logIn(username, email, password)) {
        window.location.href = "index.html";
      } else {
        console.log("Inicio de sesión fallido");
      }
    }
  }, false);
})();

// Validar campos del formulario
function validacionReg() {
  let validado = true;
  const inputs = document.querySelectorAll('#formLog input');
  inputs.forEach((input) => {
    if (input.checkValidity()) {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
    }
    else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
    validado = validado && input.checkValidity();
  });
  return validado;
}

function logIn(username, email, password) {
  var users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = users.find(user => user.username === username && user.email === email && user.password === password);
  if (validUser) {
    alert(`Bienvenido ${validUser.username}`);
    localStorage.setItem('login_success', JSON.stringify(validUser));
    return true;
  }
  return false;
}