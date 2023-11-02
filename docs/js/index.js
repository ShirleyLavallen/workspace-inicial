document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html"
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html"
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html"
  });
});

//verificación del login

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem('login_success')) || false;
  if (!user) {
    alert('Debe iniciar sesión para cceder al sitio.');
    window.location.href = "login.html";
  }
});


//Usuario en la esquina superior derecha


document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("dataUsuario");
  const userData = JSON.parse(localStorage.getItem("login_success"));

  container.textContent = userData.username;
})

let cerrar = document.getElementById("cerrarsesion"); //borrar usuario al cerrar sesion
cerrar.addEventListener("click", function () {
  localStorage.removeItem("login_success");
});

function enableDarkMode() {
  var element = document.body;
  var lightBgItem = document.querySelector("div.bg-light");
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