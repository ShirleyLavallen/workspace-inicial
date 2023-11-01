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
  return validado;
}


function setSession(){
  const button = document.getElementById("regBtn");
button.addEventListener('click', (e)=>{
  e.preventDefault()

  const username = document.getElementById("newUsername").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  var users = JSON.parse(localStorage.getItem('users')) || [];
  const isUserReg = users.find(user=>user.email === email)
  if(isUserReg){
    return alert('El usuario ya existe');
  }

  users.push({username: username, email: email, password: password});
  
  localStorage.setItem('users', JSON.stringify(users))
  window.location.href = 'login.html';
})
}


