function getProductId(){
    return localStorage.getItem('selectedProduct');
  }
  
document.addEventListener("DOMContentLoaded", function() {
    const productId = getProductId();


    alert(productId);


    fetch(PRODUCT_INFO_URL + productId + ".json")
    .then(response => response.json())
    .then(product => {
        if (product) {
          const container = document.getElementById('container');
          let htmlContentToAppend = `
            <br>
            <h1>${product.name}</h1>
            <br>
            <hr>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Precio</div>
                  USD ${product.cost}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Descripción</div>
                  ${product.description}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Categoría</div>
                  ${product.category}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Cantidad de vendidos</div>
                  ${product.soldCount}
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Imágenes ilustrativas</div>
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
            `;
          
          // Itera a través de las imágenes y agrega cada una al HTML
          for (let i = 0; i < product.images.length; i++) {
            const imageUrl = product.images[i];
            htmlContentToAppend += `
              <div class="col-3 mb-2">
              <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="Foto ${product.name}">
              </div>
              </div>
            `;
          }
          
          htmlContentToAppend += `
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          `;
          
          container.innerHTML = htmlContentToAppend;
        } else {
          console.error('Producto no encontrado');
        }
      }) 
    .catch(error => {
        console.error("Error:", error);
    });




    // fetch a json de los comentarios de los productos

    const URL_COMENTARIOS  = "https://japceibal.github.io/emercado-api/products_comments/";

    fetch(URL_COMENTARIOS + productId + ".json")
    .then(response => response.json())
    .then(comment => { 
      

      // recorrer cada cometario de la lista 

      for (const i of comment) {
      
      let producto = i.product;
      let description = i.description;
      let dateTime = i.dateTime;
      let username = i.user;
      let score = i.score;
      
      // console.log (producto,description,dateTime,username,score);
      }
    })

})