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



//Mostrar producto precargado
document.addEventListener('DOMContentLoaded', function () {
  fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
    .then(response => response.json())
    .then(data => {
      const productoElement = document.getElementById("producto");
      const productoData = data.articles[0];

      productoElement.innerHTML = `
        <td class="w-25"><img id="imagenProducto" src="${productoData.image}" alt="Imagen del Producto" class="img-fluid" style="max-width: 50%;"></td>
        <td>${productoData.name}</td>
        <td>$${productoData.unitCost}</td>
        <td><input type="number" id="cantidadProducto" value="${productoData.count}" min="1" ></td>
        <td id="subtotalProducto">$${(productoData.unitCost)}</td>
        <td><a href="#" class="btnEliminar" style= "cursor: pointer">Eliminar</a></td>
      `;

    })
    .catch(error => {
      console.error('Error al obtener datos del carrito:', error);
    });
});


//Agregar prductos al carrito
const productosAdd = document.getElementById("productos-agregados");

document.addEventListener('DOMContentLoaded', function () {

  var storedProducts = JSON.parse(localStorage.getItem('productosCompras'));

  for (const productAddedId in storedProducts) {

    //variable de la cantidad de productos
    var cantidad = storedProducts[productAddedId];
    //prueba
    console.log("Producto ID: " + productAddedId + ", Cantidad: " + cantidad);

    fetch(PRODUCT_INFO_URL + productAddedId + ".json")
      .then(response => response.json())
      .then(data => {
        productosAdd.innerHTML += `
        <tr class="producto">
        <td onclick="window.location='product-info.html'; localStorage.setItem('selectedProduct', ${data.id})"style="cursor: pointer" class="w-25"><img src="${data.images[0]}" alt="Imagen del Producto" class="img-fluid" style="max-width: 50%;"></td>
        <td onclick="window.location='product-info.html'; localStorage.setItem('selectedProduct', ${data.id})"style="cursor: pointer">${data.name}</td>
        <td>$${data.cost}</td>
        <td><input type="number" value="1" min="1" ></td>
        <td id="subtotalProducto">$${data.cost}</td>
        <td><a href="#" class="btnEliminar" style= "cursor: pointer">Eliminar</a></td>
        </tr>
      `;
      })
      .catch(error => {
        console.error('Error al obtener datos del carrito:', error);
      });
  }
});


//Subtotal (costo del producto * cantidad)
productosAdd.addEventListener('input', function (event) {
  if (event.target.type === 'number') {
    const cantidadInput = event.target;
    const row = cantidadInput.closest('.producto');
    const precioUnitario = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('$', ''));
    const cantidad = parseInt(cantidadInput.value);
    const subtotal = row.querySelector('td:nth-child(5)');
    const nuevoSubtotal = precioUnitario * cantidad;
    subtotal.textContent = `$${nuevoSubtotal}`;
  }
});

//Elimina el producto del carrito
productosAdd.addEventListener('click', function (event) {
  if (event.target.classList.contains('btnEliminar')) {
    const row = event.target.closest('.producto');
    row.remove();
  }
});
