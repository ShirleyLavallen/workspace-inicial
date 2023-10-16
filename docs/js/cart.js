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
        <td>USD${productoData.unitCost}</td>
        <td><input type="number" id="cantidadProducto" value="${productoData.count}" min="1" ></td>
        <td class="subtotalProducto">USD<span class="subtotalProductoPrecio">${(productoData.unitCost)}</span></td>
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

  const shippings = document.getElementsByClassName('radio-shipping');

  /* Evento click de input radio */
  for (let shipping of shippings) {
    shipping.addEventListener('click', function(event){
      const elem = event.target;
      imprimirPorcentajeDeEnvios(elem.value);
    });
  }

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
          <td>USD${data.cost}</td>
          <td><input type="number" value="1" min="1" ></td>
          <td class="subtotalProducto">USD<span class="subtotalProductoPrecio">${data.cost}</span></td>
          <td><a href="#" class="btnEliminar" style= "cursor: pointer">Eliminar</a></td>
          </tr>
        `;
        subtotalFinal();
        shippings[0].click();
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
    const precioUnitario = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('USD', ''));
    const cantidad = parseInt(cantidadInput.value);
    const nuevoSubtotal = precioUnitario * cantidad;
    const subtotal = row.querySelector('td:nth-child(5)');
    const subtotalPrecio = subtotal.querySelector('.subtotalProductoPrecio')
    subtotalPrecio.innerText = nuevoSubtotal;
    subtotalFinal();
  }
});

//Elimina el producto del carrito
productosAdd.addEventListener('click', function (event) {
  if (event.target.classList.contains('btnEliminar')) {
    const row = event.target.closest('.producto');
    row.remove();
    subtotalFinal();
  }
});

//Suma de Subtotales 
function subtotalFinal() {
  let sumaSubtotales = document.getElementsByClassName("subtotalProductoPrecio");
  let suma = 0;
  for(let i = 0; i < sumaSubtotales.length; i++){
    sumaSubtotal = sumaSubtotales[i];
    suma += Number(sumaSubtotal.innerText);
}
  document.getElementById('subtotalPrecioFinal').innerHTML = suma;
  calcularPorcentajeDeEnvios();
}

/* Porcentajes de envios */
function imprimirPorcentajeDeEnvios(porcentaje){
  let sumaSubtotalFinal = document.getElementById('subtotalPrecioFinal');
  document.getElementById("costo-de-envio").innerText = Math.floor( Number(sumaSubtotalFinal.innerText) * porcentaje );
  precioTotalAPagar();
}

function calcularPorcentajeDeEnvios() {
  const shippings = document.getElementsByClassName('radio-shipping');
  for(let shipping of shippings){
    if(shipping.checked){
      imprimirPorcentajeDeEnvios(shipping.value);
    }
  }
}
/* Total a pagar */
function precioTotalAPagar() {
  let costoSubtotal = document.getElementById('subtotalPrecioFinal');
  let costoEnvio = document.getElementById('costo-de-envio');
  document.getElementById('total').innerText = Number(costoSubtotal.innerText) + Number(costoEnvio.innerText);
}