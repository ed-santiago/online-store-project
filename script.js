const productAPI = "http://localhost:3000/products"
const cartAPI = "http://localhost:3000/cart"
const favouriteAPI = "http://localhost:3000/favourite"
const cartCountAPI = "http://localhost:3000/cartCount"
const favouriteCountAPI = "http://localhost:3000/favouriteCount"

const productSection = document.querySelector("#product-collection")
const products = document.querySelector(".products")
const cartCountElement = document.querySelector("#cartCount")

const cartCounter = []

fetch(cartCountAPI)
  .then(res => res.json())
  .then(counter => {
    cartCounter.push(counter.count);
    showCartCount(counter.count);
  })

//Hide cart count and heart count if 0

function showCartCount(counterCount) {
  if (cartCounter[0] > 0) {
    cartCountElement.style.display = "block"
    cartCountElement.textContent = counterCount
  } else {
    cartCountElement.style.display = "none"
  }
}

//Modal

const productCart = document.querySelector("#product-cart")

const cart = document.querySelector("#cart")
cart.addEventListener("click", e => {
  e.preventDefault();
  modal.showModal();
})

const cartBackButton = document.querySelector("#modal-header button")
cartBackButton.addEventListener("click", e => {
  e.preventDefault();
  modal.close();
})

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
  cartBtn.classList.add("cartBtn")
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

  //Add to cart db.json

  cartBtn.addEventListener("click", () => {
    fetch(cartAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: `${product.image}`,
        title: `${product.title}`,
        quantity: 1,
        price: product.price.originalPrice,
        salePrice: product.price.salePrice
      })
    })
      .then(res => res.json())
      .then(cartItem => renderCartItem(cartItem))
  })

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

  //Cart Count

  /*cartBtn.addEventListener("click", () => {
    fetch(cartCountAPI)
      .then(res => res.json())
      .then(cartCount => {
        if (!cartBtn.dataset.clicked) {
          cartBtn.setAttribute("data-clicked", "true");
          fetch(cartCountAPI, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              count: cartCount.count += 1
            })
          })
          cartCountElement.textContent = cartCount.count;
          cartBtn.style.color = "white";
          cartBtn.style.backgroundColor = "purple";
        } else {
          cartBtn.removeAttribute("data-clicked")
          fetch(cartCountAPI, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              count: cartCount.count -= 1
            })
          })
          cartCountElement.textContent = cartCount.count;
          cartBtn.style.color = "black";
          cartBtn.style.backgroundColor = "white";
        }
      })
  })*/

  cartBtn.addEventListener("click", () => {

    fetch(cartCountAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        count: cartCounter[0] += 1
      })
    })
    .then(res => res.json())
      .then(counter => {
        showCartCount(counter.count);
      })
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

//Render products onto cart

fetch(cartAPI)
  .then(res => res.json())
  .then(cartItems => renderCartItems(cartItems))

function renderCartItems(cartItems) {
  cartItems.forEach(cartItem => renderCartItem(cartItem))
}

function renderCartItem(cartItem) {

  //Image
  const itemDiv = document.createElement("div")
  itemDiv.classList.add("item")
  productCart.append(itemDiv)


  const cartImg = document.createElement("img")
  cartImg.src = cartItem.image
  itemDiv.append(cartImg)

  //Title
  const titleDiv = document.createElement("div")
  titleDiv.classList.add("title")
  productCart.append(titleDiv)

  const titleP = document.createElement("p")
  titleP.textContent = cartItem.title;
  titleDiv.append(titleP)

  //Quantity
  const quantityDiv = document.createElement("div")
  quantityDiv.classList.add("quantity")
  productCart.append(quantityDiv)

  const leftBtn = document.createElement("button")
  leftBtn.innerHTML = "<ion-icon name=\"caret-back-outline\"></ion-icon>"
  quantityDiv.append(leftBtn)

  const quantityP = document.createElement("p")
  quantityP.textContent = cartItem.quantity
  quantityDiv.append(quantityP)

  const rightBtn = document.createElement("button")
  rightBtn.innerHTML = "<ion-icon name=\"caret-forward-outline\"></ion-icon>"
  quantityDiv.append(rightBtn)

  //Price
  const priceCartDiv = document.createElement("div")
  priceCartDiv.classList.add("price")
  productCart.append(priceCartDiv)

  const priceCartP = document.createElement("p")
  priceCartP.textContent = cartItem.price
  priceCartDiv.append(priceCartP)

  //Remove
  const removeDiv = document.createElement("div")
  removeDiv.classList.add("remove")
  productCart.append(removeDiv)

  const removeBtn = document.createElement("button")
  removeBtn.textContent = "REMOVE"
  removeDiv.append(removeBtn)

  //Remove product from cart

  removeBtn.addEventListener("click", () => {
    itemDiv.remove();
    titleDiv.remove();
    quantityDiv.remove();
    priceCartDiv.remove();
    removeDiv.remove();
    fetch(`${cartAPI}/${cartItem.id}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json"
      }
    })
  })
}