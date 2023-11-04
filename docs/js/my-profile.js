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