const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

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
                   <p class="soldCount">Sold Count ${product.soldCount}</p>
                   <a href="#" class="btn btn-primary">Ver Detalles</a>
                 </div>
               </div>
            </div>`;
    }
}

fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    showCategoryName(data.catName); 
    showProducts(data.products);
  })
  .catch(error => {
    console.error("Error:", error);
  });