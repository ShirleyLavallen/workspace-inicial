//Traigo los datos del array de registro guardado en el localStorage 
let arrayuser = JSON.parse(localStorage.getItem('users'));
let userData = null;

document.addEventListener("DOMContentLoaded", () => {

  //Datos precargados en mi perfil
  userData = JSON.parse(localStorage.getItem('login_success'));
  let user = arrayuser[getIndexOfUser()];
  let userName1 = document.getElementById("primerNombre");
  let userName2 = document.getElementById("segundoNombre");
  let userLastname1 = document.getElementById("apellido");
  let userLastname2 = document.getElementById("segundoApellido");
  let userEmail = document.getElementById("emailprofile");
  let userTel = document.getElementById("telefono");
  let userName = document.getElementById("nombreUsuario");
 
  if (user) {
     userName1.value = user.firstName || "";
     userName2.value = user.secondName || "";
     userLastname1.value = user.firstLastname || "";
     userLastname2.value = user.secondLastname || "";
     userEmail.value = user.email || "";
     userTel.value = user.telephone || "";
     userName.value = user.username || "";
  } else {
     userName1.value = "";
     userName2.value = "";
     userLastname1.value = "";
     userLastname2.value = "";
     userEmail.value = "";
     userTel.value = "";
     userName.value = "";
  }
 })
>>>>>>> registro-v2000

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
      const imageSrc = e.target.result;
      loginSuccess.image = imageSrc;
      const user = arrayuser[getIndexOfUser()];
      user.image = imageSrc;
    }
    imgRead.readAsDataURL(selectedImage);
  }
});
// Toma la imagen del usuario que inició sesión y actualiza el src
profileImage.src = loginSuccess.image;


// Verificacion de formulario del perfil

document.addEventListener("DOMContentLoaded", function () {
  const formPerfil = document.getElementById("formRegistro");


  formPerfil.addEventListener('submit', event => {
    const btn = document.getElementById('cambios-btn');
    btn.classList.remove('is-invalid');

    if (!formPerfil.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    formPerfil.classList.add('was-validated');

    //Se guardan y actualizan los datos modificados en el array de registro
    let name1 = document.getElementById("primerNombre").value;
    let name2 = document.getElementById("segundoNombre").value;
    let lastname1 = document.getElementById("apellido").value;
    let lastname2 = document.getElementById("segundoApellido").value;
    let tel = document.getElementById("telefono").value;
    let userEmail = document.getElementById("emailprofile");
    let userName = document.getElementById("nombreUsuario");

    const user = arrayuser[getIndexOfUser()]

    user.firstName = name1;
    user.secondName = name2;
    user.firstLastname = lastname1;
    user.secondLastname = lastname2;
    user.telephone = tel;
    user.username = userName.value;
    user.email = userEmail.value;

    arrayuser[getIndexOfUser()] = user;
    localStorage.setItem('users', JSON.stringify(arrayuser));
    localStorage.setItem('login_success', JSON.stringify(user));
  })
});

function getIndexOfUser() {
  //filtro el indice del usuario que esta registrado
  let indexUser = arrayuser.findIndex(function (user, i) {
    return user.username === userData.username
  })
  return indexUser;
}