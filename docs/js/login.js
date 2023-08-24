document.addEventListener("DOMContentLoaded", function () {
  const logForm = document.getElementById("logForm");

  logForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
      setSessionData(username);
      window.location.href = "index.html";
    }
  });
});

function setSessionData(username) {
  localStorage.setItem("username", username);
}
 