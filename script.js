const productAPI = "http://localhost:3000/products"
const productSection = document.querySelector("#product-collection")

fetch(productAPI)
  .then(res => res.json())
  .then(products => renderProducts(products))

function renderProducts(products) {
  productSection.innerHTML = "";
  products.forEach(product => renderProduct(product))
}

function renderProduct(product) {
  const div = document.createElement("div")
  div.classList.add("products")
  productSection.append(div)

  div.innerHTML = `
    <div class="img-div">
      <img class="product-image" src="${product.image}" alt="product image"/>
    </div>
    <div class="product-info">
      <p>${product.category}</p>
      <h3>${product.title}</h3>
      <p class="star-rating">Rating: </p>
      <p>Price: ${product.price}</p>
    <div 
  `

  const p = document.querySelector(".star-rating")

  let rating = "";

  for(let i = 0; i <= product.rating.rate; i++) {

  }

  console.log(product.rating.rate)
}



