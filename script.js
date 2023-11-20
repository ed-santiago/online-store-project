const productAPI = "http://localhost:3000/products"

const productSection = document.querySelector("#product-collection")
const products = document.querySelector(".products")

//Render product onto page

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
      <div class="category-and-rating">
        <p>${product.category}</p>
        <p>${starRating(product.rating.rate)}
      </div>
      <h3>${product.title}</h3>
      ${sale()}
    </div>
    `

  function sale() {
    let priceHTML = `
    <div class="price">
      <p>${product.price.originalPrice}</p>
    </div>
    `

    if(product.category === "men's clothing") {
      priceHTML = `
      <div class="price">
        <p><s>${product.price.originalPrice}</s></p>
        <p>${product.price.salePrice}</p>
      </div>
      `
    }

    if(product.category === "women's clothing") {
      priceHTML = `
      <div class="price">
        <p><s>${product.price.originalPrice}</s></p>
        <p>${product.price.salePrice}</p>
      </div>
      `
    }

    return priceHTML;
  }

}

//star rating for product cards

function starRating(rating) {
  let ratingStar = "";

  for (let i = 1; i <= rating; i++) {
    ratingStar += "<ion-icon name=\"star\"></ion-icon>"
  }

  return ratingStar;
}

const randomNumber = Math.round(Math.random() * 5);
console.log(randomNumber)

//set price to sale

