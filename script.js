const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);


fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => console.log(data))