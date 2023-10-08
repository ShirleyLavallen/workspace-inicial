document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("logBtn");

  button.addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (username && password && email) {
      setSessionData(username);
      window.location.href = "index.html";
    }
  });
});

function setSessionData(username) {
  localStorage.setItem("username", username);
}
 
let cerrar = document.getElementById("cerrarsesion"); //borrar usuario al cerrar sesion
cerrar.addEventListener("click", function () {
  localStorage.removeItem("username"); 
});