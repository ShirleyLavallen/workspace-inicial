//verificación del login

document.addEventListener("DOMContentLoaded", function () {
  const userSes = getSessionData("username");

  if (!userSes) {
    alert("Por favor, registrate");
    window.location.href = "login.html";
  }
});

function getSessionData(usrname) {
  return localStorage.getItem(usrname);
}

//Usuario en la esquina superior derecha


document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("dataUsuario");
  const usuario = localStorage.getItem("username");

  container.textContent = usuario;
})

let cerrar = document.getElementById("cerrarsesion"); //borrar usuario al cerrar sesion
cerrar.addEventListener("click", function () {
  localStorage.removeItem("username");
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


//cargar primer elemento del carrito

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
    .then(response => response.json())
    .then(data => {
      const productoElement = document.getElementById("producto");
      const productoData = data.articles[0];

      const updateSubtotal = () => {
        const cantidadInput = document.getElementById("cantidadProducto");
        const subtotalElement = document.getElementById("subtotalProducto");
        const cantidad = parseInt(cantidadInput.value);
        const unitCost = productoData.unitCost;
        const subtotal = cantidad * unitCost;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      };

      productoElement.innerHTML = `
        <td class="w-25"><img id="imagenProducto" src="${productoData.image}" alt="Imagen del Producto" class="img-fluid" style="max-width: 50%;"></td>
        <td>${productoData.name}</td>
        <td>$${productoData.unitCost}</td>
        <td><input type="number" id="cantidadProducto" value="${productoData.count}" min="1" ></td>
        <td id="subtotalProducto">$${(productoData.unitCost * productoData.count).toFixed(2)}</td>
      `;

      const cantidadInput = document.getElementById("cantidadProducto");
      cantidadInput.addEventListener("input", updateSubtotal);

      updateSubtotal();
    })
    .catch(error => {
      console.error('Error al obtener datos del carrito:', error);
    });
});