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

//Modo Noche

function enableDarkMode() {
  var element = document.body;
  element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";

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

//campo e-mail del perfil mediante el usado en el login

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email"); // Recupera el correo de sessionStorage

  if (email) {
    document.getElementById("emailprofile").value = email;
  }
});


const loginSuccess = JSON.parse(localStorage.getItem('login_success'));
const imageInput = document.getElementById('imageInput');
const profileImage = document.getElementById('profileImage');
// Función para cambiar imágen de usuario
imageInput.addEventListener('change', function () {
  const selectedImage = imageInput.files[0];

  if (selectedImage) {
    const imgRead = new FileReader();
    imgRead.onload = function (e) {
      profileImage.src = e.target.result;
      const users = JSON.parse(localStorage.getItem('users')) || [];

      const userId = loginSuccess.id;
      const user = users.find(u => u.id === userId);

      // Actualiza la imagen del usuario en login_success
      loginSuccess.image = e.target.result;
      localStorage.setItem('login_success', JSON.stringify(loginSuccess));

      // Actualiza la imagen del usuario en users
      user.image = e.target.result;
      localStorage.setItem('users', JSON.stringify(users));
      
    };
    imgRead.readAsDataURL(selectedImage);
  }
});
// Toma la imagen del usuario que inició sesión y actualiza el src
  profileImage.src = loginSuccess.image;