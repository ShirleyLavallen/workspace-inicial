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
          document.getElementById("nameProduct").innerText = product.name;
          document.getElementById("precioProduct").innerText = 'USD ' + product.cost;
          document.getElementById("descriptionProduct").innerText = product.description;
          document.getElementById("categoryProduct").innerText = product.category;
          document.getElementById("soldProduct").innerText = product.soldCount;
          
          // Itera a través de las imágenes y agrega cada una al HTML

          const container = document.getElementById('imagen');
          let htmlContentToAppend = ""; 
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

 function editForm(form){
  const newComment = form.querySelector('textarea').value;
  //Id del comentario
  const idComment = form.querySelector('input[name="id"]').value;
  
  document.getElementById('comment-'+idComment).innerText = newComment;
  hideEditCommentForm(form);
 }

 /** Cuerpo del comentarios  **/
     
 function bodyComment(id, username, description, dateTime, score){
  let stars = scoreStars(score);
  return `<section class="section">
    <div class="container my-2 py-2 text-dark">
     <div class="row d-flex justify-content-center">
      <div class="col-md-12 col-lg-10 col-xl-12"
       <div class="card mb-2">
         <div class="card-body">
           <div class="d-flex flex-start">
             <div class="w-100">
               <div class="d-flex justify-content-between align-items-center mb-3">
                 <h6 class="text-primary fw-bold mb-0">
                   ${username}
                   <span class="text-dark ms-2" id="comment-${id}">${description}</span>
                   <form class="d-none edit-comment" onsubmit="editForm(this)">
                    <textarea class="form-control" name="comentario">${description}</textarea>
                    <input type="hidden" name="id" value="${id}">
                      <button class="button" type="submit">
                      Guardar
                      </button>
                   </form>
                 </h6>
                 <p class="mb-0">${dateTime}</p>
               </div>
               <div class="d-flex justify-content-between align-items-center">
                 <p class="small mb-0" style="color: #aaa;">
                   <a class="link-grey remove" onclick="deleteComment(this);">Eliminar</a> •
                   <a class="link-grey edit" onclick="showEditCommentForm(this);">Editar</a> 
                 </p>
                 <div class="d-flex flex-row">
                   ${stars}
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

 function showComments(comments) {
  let htmlCommentsToAppend = "";
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];
      let id = i;
      let producto = comment.product;
      let description = comment.description;
      let dateTime = comment.dateTime;
      let username = comment.user;
      let score = comment.score;
        
    htmlCommentsToAppend += bodyComment(id, username, description, dateTime, score);
    
  } 
  commentsContainer.innerHTML = htmlCommentsToAppend;
 }

 function getCurrentDateTime(){
  const date = new Date();
  return date.toLocaleString();
 }

  function deleteComment(element) {
    //Busco el parent section
    const section = element.closest('section');
    //Elimino la section completa
    section.remove();
  }

 function showEditCommentForm(element) {
    //Busco el parent section
    const section = element.closest('section');
    const form = section.querySelector('.edit-comment');
    form.classList.remove('d-none');
 }

 function hideEditCommentForm(element) {
  //Busco el parent section
  const section = element.closest('section');
  const form = section.querySelector('.edit-comment');
  form.classList.add('d-none');
}

 /** calificacion con estrellas  **/

 function scoreStars(score) {
  let starsHtml = "";
  for(let i=1; i<=5; i++){
    if(i<=score){
      starsHtml += `<i class="fas fa-star text-warning me-2"></i>`
    }else{
      starsHtml += `<i class="far fa-star me-2"></i>`
    }
  }
  return starsHtml
 }

 //Agregar nuevo comentario simulado

 document.addEventListener("DOMContentLoaded", 
  function newComment() {

    let actualUsername = localStorage.getItem("username");
    let newCommDescription = document.getElementById("commentInput").value;
    let dateTime = getCurrentDateTime();
    let newCommScore = document.getElementById("puntaje").value;

  if (newCommDescription.length > 0) {
    const id = document.querySelectorAll('section.section').length;//Obteniendo la cantidad de comentarios actuales 
    const nuevoComentario = document.createElement("div");
    nuevoComentario.classList.add("comentario"); 
    nuevoComentario.innerHTML = bodyComment(id, actualUsername, newCommDescription , dateTime, newCommScore); 

    // Agrega el nuevo comentario al container
    const commentContainer = document.getElementById("comment"); 
    commentContainer.appendChild(nuevoComentario); 

    // Limpia el contenido de descripcion
    commentInput.value = ""; 
  }

  document.getElementById("enviar").addEventListener("click", function(){
    newComment(comment);
    }); 

  document.getElementById("commentInput").addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      newComment(comment);
    }
     }); 

  
})

