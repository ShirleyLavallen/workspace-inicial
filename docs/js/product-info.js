const commentsContainer = document.getElementById("comment")

function getProductId(){
    return localStorage.getItem('selectedProduct');
  }
  
document.addEventListener("DOMContentLoaded", function() {
    const productId = getProductId();




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

    fetch(URL_COMENTARIOS + productId + ".json")
    .then(response => response.json())
    .then(comments => {

      showComments(comments);
    })
      
 })

 const currentCommentsArray = [];

 function showComments(comments) {
  let htmlCommentsToAppend = "";
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
      
      let producto = comment.product;
      let description = comment.description;
      let dateTime = comment.dateTime;
      let username = comment.user;
      let score = comment.score;
    
        
    htmlCommentsToAppend += `
    <section style="background-color: #f7f6f6;">
      <div class="container my-5 py-5 text-dark">
       <div class="row d-flex justify-content-center">
        <div class="col-md-12 col-lg-10 col-xl-8"

         <div class="card mb-3">
           <div class="card-body">
             <div class="d-flex flex-start">
               <div class="w-100">
                 <div class="d-flex justify-content-between align-items-center mb-3">
                   <h6 class="text-primary fw-bold mb-0">
                     ${username}
                     <span class="text-dark ms-2">${description}
                   </h6>
                   <p class="mb-0">${dateTime}</p>
                 </div>
                 <div class="d-flex justify-content-between align-items-center">
                   <p class="small mb-0" style="color: #aaa;">
                     <a href="#!" class="link-grey">Remover</a> •
                     <a href="#!" class="link-grey">Editar</a> •
                     <a href="#!" class="link-grey">Traducir</a>
                   </p>
                   <div class="d-flex flex-row">
                     ${score}<i class="fas fa-star text-warning me-2"></i>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
        </div>
      </div>
     </div>
    </section>`; 
  } 
  commentsContainer.innerHTML = htmlCommentsToAppend;
}