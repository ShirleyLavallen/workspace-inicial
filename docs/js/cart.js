//verificación del login

document.addEventListener("DOMContentLoaded", function () {
    const userSes = getSessionData("username");
  
    if (!userSes) {
      alert("Por favor, registrate");
      window.location.href = "login.html";
    }
  });
  
  function getSessionData(usrname) {
    return localStorage.getItem(usrname);
  } 
  
  //Usuario en la esquina superior derecha
  
  
  document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("dataUsuario");
    const usuario = localStorage.getItem("username");
    
      container.textContent = usuario;
  })
  
  let cerrar = document.getElementById("cerrarsesion"); //borrar usuario al cerrar sesion
  cerrar.addEventListener("click", function () {
    localStorage.removeItem("username"); 
  });

    //Modo Noche

    function enableDarkMode() {
      var element=document.body;
    element.dataset.bsTheme =
    element.dataset.bsTheme == "light" ? "dark" : "light";
    }