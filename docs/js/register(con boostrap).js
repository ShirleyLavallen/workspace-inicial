  const forms = document.querySelectorAll('.needs-validation')
  const btn = document.getElementById("regBtn");
  const user = document.getElementById("newUser");
  const email = document.getElementById("newEmail");
  const pass1 = document.getElementById("newPassword");
  const pass2 = document.getElementById("newPassword2");

 //Validación de formulario

 btn.addEventListener('click', event => {
     
      if (!user.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      
      if (!email.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }


      else {
        setSessionData(username);
        window.location.href = "index.html";
      }
      
      form.classList.add('was-validated')
    }, false)


//Setear user en local storage
 function setSessionData(username) {
    localStorage.setItem("username", username);
  }
