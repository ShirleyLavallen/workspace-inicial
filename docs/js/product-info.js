function getProductId(){
    return localStorage.getItem('selectedProduct');
  }
  
document.addEventListener("DOMContentLoaded", function() {
    const productId = getProductId()


    alert(productId);


    fetch(PRODUCT_INFO_URL + productId + ".json")
    .then(response => response.json())
    .then(data => {
    console.log(data);
    })  
    .catch(error => {
        console.error("Error:", error);
    });
})