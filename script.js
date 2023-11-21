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
  div.classList.add("product-card")
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

  //set price to sale

  function sale() {
    let priceHTML = `
    <div class="price">
      <p>${product.price.originalPrice}</p>
    </div>
    `

    if(product.category === "men's clothing" || product.category === "women's clothing") {
      priceHTML = `
      <div class="price">
        <p><s>${product.price.originalPrice}</s></p>
        <p>${product.price.salePrice}</p>
      </div>
      `
    }

    return priceHTML;
  }

  //Hover over product cards

  div.addEventListener("mouseenter", () => {
    div.style.transform = "scale(1.05)"
  })

  div.addEventListener("mouseleave", () => {
    div.style.transform = "scale(1)"
  })
  
}


//star rating for product cards

function starRating(rating) {
  let ratingStar = "";

  for (let i = 1; i <= rating; i++) {
    ratingStar += "<ion-icon name=\"star\"></ion-icon>"
  }

  return ratingStar;
}