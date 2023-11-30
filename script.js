const productAPI = "http://localhost:3000/products"

const productSection = document.querySelector("#product-collection")
const products = document.querySelector(".products")
const cartCountElement = document.querySelector("#cartCount")
const productSectionH1 = document.querySelector("#productSection h1")
const totalElement = document.querySelector("#total")

let cartCounter = 0;
let total = 0;
let favourites = [];

document.querySelector("header h1").addEventListener("click", () => location.reload())

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
  priceDiv.classList.add("productPrice")
  priceDiv.innerHTML = sale()
  infoDiv.append(priceDiv)

  //Add to cart and increment cart count

  cartBtn.addEventListener("click", () => {
    renderCartItem(product);
    cartCounter++
    showCartCount();
  })

  //Add to favourite section and increment heart

  heartBtn.addEventListener("click", () => {
    
    console.log(heartBtn.className)
    if(heartBtn.className === "isFavourite") {
      favourites = favourites.filter(title => title !== product.title)
      
    } else {
      favourites.push(product.title)
      
    }
    heartBtn.classList.toggle("isFavourite")

    console.log(favourites)
  })

  //set price to sale

  function sale() {
    let priceHTML = `
      <p>$${product.price.originalPrice}</p>
    `
    if (product.category === "Men's clothing" || product.category === "Women's clothing") {
      priceHTML = `
        <p><s>$${product.price.originalPrice}</s></p>
        <p class="productSale">$${product.price.salePrice}</p>
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

//Render products onto cart

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
  priceCartP.textContent = cartSalePrice()
  priceCartDiv.append(priceCartP)

  //Remove
  const removeDiv = document.createElement("div")
  removeDiv.classList.add("remove")
  productCart.append(removeDiv)

  const removeBtn = document.createElement("button")
  removeBtn.textContent = "REMOVE"
  removeDiv.append(removeBtn)

  //Show sale price if it has sale

  function cartSalePrice() {
    let priceHTML = cartItem.price.originalPrice
    if (cartItem.price.salePrice > 0) {
      priceHTML = cartItem.price.salePrice
    }
    return priceHTML;
  }

  //Increase or decrease quantity and total price of item

  leftBtn.addEventListener("click", () => {
    quantityP.textContent--;

    let totalPrice = quantityP.textContent * cartSalePrice()
    priceCartP.textContent = totalPrice;
    totalElement.textContent = total -= cartSalePrice();

    if (quantityP.textContent === `${1}`) {
      leftBtn.disabled = true;
    }
  })

  //Disable left button
  if (quantityP.textContent === `${1}`) {
    leftBtn.disabled = true;
  }

  rightBtn.addEventListener("click", () => {
    quantityP.textContent++;

    let totalPrice = quantityP.textContent * cartSalePrice()
    priceCartP.textContent = totalPrice;
    totalElement.textContent = total += cartSalePrice();
    leftBtn.disabled = false;
  })

  //Remove product from cart

  removeBtn.addEventListener("click", () => {
    removeItem();
    cartCounter--;
    showCartCount();
    total = totalElement.textContent - priceCartP.textContent

    totalElement.textContent = total;
  })

  function removeItem() {
    itemDiv.remove();
    titleDiv.remove();
    quantityDiv.remove();
    priceCartDiv.remove();
    removeDiv.remove();
  }

  //Total price of cart
  totalElement.textContent = total += cartSalePrice();
}

//Hide cart count if it's 0

function showCartCount() {
  if (cartCounter === 0) {
    cartCountElement.style.display = "none"
  } else {
    cartCountElement.style.display = "block"
    cartCountElement.textContent = cartCounter
  }
}

//Men's filter
const menFilter = document.querySelector("#men-filter")
menFilter.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Mens", "Men's clothing")
})

//Shop Men
const shopMen = document.querySelector("#shopMen")
shopMen.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Mens Sale", "Men's clothing")
})

//Women's filter
const womenFilter = document.querySelector("#women-filter")
womenFilter.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Womens", "Women's clothing")
})

//Shop Women
const shopWomen = document.querySelector("#shopWomen")
shopWomen.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Womens Sale", "Women's clothing")
})

//Jewellery filter
const jewelleryFilter = document.querySelector("#jewellery-filter")
jewelleryFilter.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Jewellery", "Jewellery")
})

//Electronics filter
const electronicsFilter = document.querySelector("#electronics-filter")
electronicsFilter.addEventListener("click", (e) => {
  e.preventDefault();
  productsFilter("Electronics", "Electronics")
})

function productsFilter(title, category) {
  productSectionH1.textContent = title
  productSection.innerHTML = ''
  fetch(productAPI)
    .then(res => res.json())
    .then(products => {
      products.forEach(product => {
        if (product.category === category) {
          renderProduct(product)
        }
      })
    })
}

//Search
const searchBar = document.querySelector("#search")
searchBar.addEventListener("submit", (e) => {
  productSectionH1.textContent = "Searched Products"
  e.preventDefault();
  const searchValue = input_field.value.toLowerCase();
  productSection.innerHTML = ''
  fetch(productAPI)
    .then(res => res.json())
    .then(searches => {
      const searchArray = Array.from(searches)
      const filteredSearch = searchArray.filter(search =>
        search.title.toLowerCase().includes(searchValue))

      filteredSearch.forEach(product => {
        renderProduct(product)
      })
    })
})

//Check out

const checkout = document.querySelector("#checkout")
checkout.addEventListener("click", () => {
  alert("Thank you for your purchase!")
  location.reload();
})