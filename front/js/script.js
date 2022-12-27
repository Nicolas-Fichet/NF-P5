const url = "http://localhost:3000/api/products";
let items = document.querySelector("#items");

// -------------

fetch(url)
  .then(response => response.json())  
  .then(kanap => {
    for (let i=0; i<kanap.length; i++) {
        items.innerHTML += `          
        <a href="./product.html?id=${kanap[i]._id}">
            <article>
              <img src="${kanap[i].imageUrl}" alt="${kanap[i].altTxt}">
              <h3 class="productName">${kanap[i].name}</h3>
              <p class="productDescription">${kanap[i].description}</p>
            </article>
        </a>
        `;
      }
});
