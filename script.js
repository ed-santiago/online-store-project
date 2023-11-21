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
  //Product Cards
  const div = document.createElement("div")
    div.classList.add("product-card")
    productSection.append(div)

  //Image and buttons div
  const imgAndBtnsDiv = document.createElement("div")
    imgAndBtnsDiv.classList.add("img-div")
    div.append(imgAndBtnsDiv)

  const cardBtnsDiv = document.createElement("div")
    cardBtnsDiv.classList.add("card-buttons")
    imgAndBtnsDiv.append(cardBtnsDiv)

  //Buttons
  const viewBtn = document.createElement("button")
    viewBtn.type = "button"
    viewBtn.innerHTML = "<ion-icon name=\"eye\"></ion-icon>"
    cardBtnsDiv.append(viewBtn)

  const cartBtn = document.createElement("button")
    cartBtn.type = "button"
    cartBtn.innerHTML = "<ion-icon name=\"cart\"></ion-icon>"
    cardBtnsDiv.append(cartBtn)

  const heartBtn = document.createElement("button")
    heartBtn.type = "button"
    heartBtn.innerHTML = "<ion-icon name=\"heart\"></ion-icon>"
    cardBtnsDiv.append(heartBtn)

  //Image
  const img = document.createElement("img")
    img.classList.add("product-image")
    img.src = product.image
    img.alt = "product image"
    imgAndBtnsDiv.append(img)

  //Info
  const infoDiv = document.createElement("div")
    infoDiv.classList.add("product-info")
    div.append(infoDiv)

  const categoryAndRatingDiv = document.createElement("div")
    categoryAndRatingDiv.classList.add("category-and-rating")
    infoDiv.append(categoryAndRatingDiv)

  const pCategory = document.createElement("p")
    pCategory.textContent = product.category;
    categoryAndRatingDiv.append(pCategory)

  const pRating = document.createElement("p")
    pRating.innerHTML = starRating(product.rating.rate)
    categoryAndRatingDiv.append(pRating)

  const productTitle = document.createElement("h3")
    productTitle.textContent = product.title
    infoDiv.append(productTitle)

  const priceDiv = document.createElement("p")
    priceDiv.classList.add("price")
    priceDiv.innerHTML = sale()
    infoDiv.append(priceDiv)

  //set price to sale

  function sale() {
    let priceHTML = `
      <p>${product.price.originalPrice}</p>
    `
    if (product.category === "men's clothing" || product.category === "women's clothing") {
      priceHTML = `
        <p><s>${product.price.originalPrice}</s></p>
        <p>${product.price.salePrice}</p>
      `
    }
    return priceHTML;
  }

  //Hover over product cards

  div.addEventListener("mouseenter", () => {
    div.style.transform = "scale(1.05)";
  })

  div.addEventListener("mouseleave", () => {
    div.style.transform = "scale(1)";
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

//Modal

const cart = document.querySelector("#cart")
cart.addEventListener("click", (e) => {
  e.preventDefault();
  modal.showModal();
})

/*const div = document.createElement("div")
  div.classList.add("product-card")
  productSection.append(div)

  div.innerHTML = `
    <div class="img-div">
      <div class="card-buttons">
        <button type="button"><ion-icon name="eye-outline"></ion-icon></button>
        <button type="button"><ion-icon name="cart"></ion-icon></button>
        <button type="button"><ion-icon name="heart"></ion-icon></button>
      </div>
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
    `*/