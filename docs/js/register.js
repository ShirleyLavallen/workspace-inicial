document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("regBtn");

  button.addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const email = document.getElementById("newEmail").value;

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


