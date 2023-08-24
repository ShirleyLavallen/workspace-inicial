const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/";

const container = document.getElementById("products-list");
const categoryTitle = document.getElementById('category-title')

function showCategoryName(name){
    categoryTitle.innerText = name;
}

function showProducts(products) {
    for (const product of products) {
        container.innerHTML += `
            <div class="col-4">
               <div class="card">
                 <img src="${product.image}" class="card-img-top" alt="Foto ${product.name}">
                 <div class="card-body">
                   <h5 class="card-title">${product.name}  USD${product.cost}</h5>
                   <p class="card-text">${product.description}</p>
                   <p class="soldCount">Vendidos ${product.soldCount}</p>
                   <a href="#" class="btn btn-primary">Ver Detalles</a>
                 </div>
               </div>
            </div>`;
    }
}

function showEmptyCategoryMessage(){
  container.innerHTML = '<h4>No hay productos en esta categoría</h4>';
}

function getCategoryId(){
  return localStorage.getItem('catID');
}

//verificación del login
document.addEventListener("DOMContentLoaded", function () {
  const userSes = getSessionData("username");
  const catId = getCategoryId();
  fetch(DATA_URL + catId +'.json' )
  .then(response => response.json())
  .then(data => {
    showCategoryName(data.catName); 
    if(data.products.length > 0){
      showProducts(data.products);
      return true;
    }
    showEmptyCategoryMessage();
  })
  .catch(error => {
    console.error("Error:", error);
  });

  if (!userSes) {
    alert("Por favor, registrate");
    window.location.href = "login.html";
  }
});

function getSessionData(usrname) {
  return sessionStorage.getItem(usrname);
} 
