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
    <h3>${product.title}</h3>
    <img class="product-image" src="${product.image}" alt="product image"/>
    <p>Rating: ${product.rating.rate}</p>
    <p>Price: ${product.price}</p>
  `
}