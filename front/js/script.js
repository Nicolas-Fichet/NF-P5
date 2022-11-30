/* <section class="items" id="items"> 
<!-- -->
          <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> 
<!-- -->
        </section> */

//Variables Globales

const urlAPI = "http://localhost:3000/api/products";
var items = document.querySelector("#items");

// -------------

fetch(urlAPI) // Consulter l'API
  .then(response => response.json())  // Récupérer son contenu au format JSON
  .then(kanaps => {
    for (let kanap of kanaps)         // Pour chaque kanap des kanaps
      {                               // tu ajoutes le contenu suivant
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
