//Función registro validado

(function regValidado() {
  const button = document.getElementById("regBtn");
 

  button.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    if (validacionReg()) { 
      setSessionData(username);
      window.location.href = "index.html";
    }
  }, false)
})()

//Validar campos del form
function validacionReg() {
  let validado = true;
  const inputs = document.querySelectorAll('#formReg input');
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

//Setear user en local storage
function setSessionData(username) {
  localStorage.setItem("username", username);
}

 //Borrar usuario al cerrar sesión
let cerrar = document.getElementById("cerrarsesion"); 
cerrar.addEventListener("click", function () {
  localStorage.removeItem("username"); 
});



