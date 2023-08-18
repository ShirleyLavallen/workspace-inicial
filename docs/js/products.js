//verificación del login

document.addEventListener("DOMContentLoaded", function () {
    const userSes = getSessionData("username");
  
    if (!userSes) {
      alert("Por favor, registrate");
      window.location.href = "login.html";
    }
  });
  
  function getSessionData(usrname) {
    return sessionStorage.getItem(usrname);
  } 
