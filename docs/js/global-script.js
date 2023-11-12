//verificación del login

document.addEventListener("DOMContentLoaded", function () {
    const user = getLoggedInUser();
    if (!user && !loginPage()) {
      alert('Debe iniciar sesión para acceder al sitio.');
      window.location.href = "login.html";
    }
  });
  
  
  //Usuario en la esquina superior derecha
  
  
  document.addEventListener("DOMContentLoaded", () => {
  
    if (getLoggedInUser()){
      setUserNameProfile();
    }
    
    const cerrar = document.getElementById("cerrarsesion"); //borrar usuario al cerrar sesion
    if(cerrar){
      cerrar.addEventListener("click", function () {
        localStorage.removeItem("login_success");
      });
    }
  })

  function setUserNameProfile(){
    const userData = getLoggedInUser();
    const container = document.getElementById("dataUsuario");
    
    if(container){
      container.textContent = userData.username;
    }
  }
  
  
  //Modo oscuro
  
  function enableDarkMode() {
    var element = document.body;
    var lightBgItem = document.querySelector("div.bg-light");
    if( !lightBgItem ){
      return; 
    }
    
    element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
    element.classList = element.classList == "lightBg" ? "darkBg" : "lightBg";
    lightBgItem.classList.toggle("bg-light" ? "bg-dark" : "bg-light");
  
    localStorage.setItem('theme', element.dataset.bsTheme);
  }
  
  // Función para cargar el tema desde localStorage
  
  function loadThemeFromLocalStorage() {  
    var theme = localStorage.getItem('theme');
    if (theme === "dark") {
      enableDarkMode();
    }
  }
  
  // Cargar el tema desde localStorage al cargar la página
  
  window.addEventListener('DOMContentLoaded', loadThemeFromLocalStorage);  

  // Funcion general de validacion de formularios

  function validacionGeneral(inputs) {
    let validado = true;
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

  function getAllUsers(){
    return JSON.parse(localStorage.getItem('users'));
  }

  function findUserByEmail(email){
    return  getAllUsers().find(user =>user.email === email);
  }

  function getLoggedInUser(){
    return JSON.parse(localStorage.getItem("login_success"));
  }

  function loginPage(){
    return window.location.pathname === '/login.html';
  }

  function logIn(user) {
    localStorage.setItem('login_success', JSON.stringify(user));
  }

  function updateUser(user) {
    localStorage.setItem('login_success', JSON.stringify(user));
  }

  function updateUsersList(user){
    let users = getAllUsers();
    users[findIndexUserById(user.id)] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  function findIndexUserById(userId){
    return getAllUsers().findIndex(user => user.id === userId);
  }