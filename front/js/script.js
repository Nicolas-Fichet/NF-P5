const urlAPI = "http://localhost:3000/api/products";
var items = document.querySelector("#items");

// -------------

fetch(urlAPI)
  .then(response => response.json())  
  .then(kanaps => {
    for (let kanap of kanaps)
      {
        items.innerHTML += `          
        <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
        </a>
        `;
      }
});
