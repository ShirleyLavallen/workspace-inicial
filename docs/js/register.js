//Función registro validado

(function regValidado() {
  const button = document.getElementById("regBtn");
 

  button.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    if (validacionReg()) { 
      setSession(username);
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
  const password1 = document.querySelector('#newPassword');
  const password2 = document.querySelector('#newPassword2');
        
  if( password1.value !== password2.value){
    password2.setCustomValidity("not-equals");
    validado = false;
  }else{
    password2.setCustomValidity("");
  }

  document.querySelector('#formReg').classList.add('was-validated');
  return validado;
}


function setSession(){
  const username = document.getElementById("newUsername").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  var users = JSON.parse(localStorage.getItem('users')) || [];
 
  const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;

  const uniqueId = lastUserId + 1;

  const isUserReg = users.find(user=>user.email === email)
  if(isUserReg){
    return alert('Ya existe un usuario con este email');
  }

  users.push({id:uniqueId, username: username, email: email, password: password, image: "https://www.chromethemer.com/backgrounds/google/images/goku-dragon-ball-super-google-background.jpg"});
  
  localStorage.setItem('users', JSON.stringify(users))
  window.location.href = 'login.html';

}

