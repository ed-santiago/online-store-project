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

  /*const imgDiv = document.createElement("div")
  imgDiv.classList.add("img-div");
  div.append(imgDiv);
  const img = document.createElement("img");
  img.classList.add("product-image");
  img.src = product.image;
  img.alt = "product image";
  imgDiv.append(img)

  const productInfoDiv = document.createElement("div");
  productInfoDiv.classList.add*/

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
      <p>${product.price = 10}</p>
    </div>
    `
  /*<p class="price">Price: ${product.price}</p>

  const p = document.createElement("p");
  p.classList.add = "price";
  p.textContent = product.price;
  
  console.log(document.querySelector(".product-info")).append(p)*/

  function sale() {
    let priceHTML = `${product.price}`;

    if(product.category === "men's clothing") {
      priceHTML = `${Math.round(product.price * 0.5)}`
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

