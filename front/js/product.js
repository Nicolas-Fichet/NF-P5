//Variables Globales

const urlAPI = "http://localhost:3000/api/products";

// -------------

// Récupérer l'id dans l'url
var str = document.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
//console.log("----ID de ma page actuelle")
//console.log(id);

let curentArticle = document.querySelector(".item");

//consulter l'API -- 

fetch(urlAPI+"/"+id)
    .then(response => response.json())
      
    .then(kanaps => {

         //Menu déroulant choix des couleurs
        let choixCouleur = `<option value="">-- SVP, choisissez une couleur --</option>`;
        kanaps.colors.forEach(couleur => {
            choixCouleur += `<option value=${couleur}">${couleur}</option>`;
            //console.log(choixCouleur);
            })

         // Edition de l'article avec ses informations
        let htmlArticle = `<article>
        <div class="item__img">
          <img src="${kanaps.imageUrl} " alt="${kanaps.altTxt}">
        </div>
        <div class="item__content">

          <div class="item__content__titlePrice">
            <h1 id="title">${kanaps.name} </h1>
            <p>Prix : <span id="price">${kanaps.price}</span>€</p>
          </div>

          <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">${kanaps.description}</p>
          </div>

          <div class="item__content__settings">
            <div class="item__content__settings__color">
              <label for="color-select">Choisir une couleur :</label>
              <select name="color-select" id="colors">
                  ${choixCouleur}
              </select>
            </div>

            <div class="item__content__settings__quantity">
              <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
          </div>

          <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
          </div>

        </div>
      </article>`;
      curentArticle.innerHTML += htmlArticle;
      

      let bouton = document.querySelector('#addToCart');
      bouton.addEventListener("click", () => {
        let value = document.querySelector("#quantity").value;
        checkColor();
        checkQuantity(value);
        //localStorage.setItem('test',value)
        //-----
        let personne = {
          nom : "Fichet",
          prenom : "Nicolas",
          age : 31,
        }
        localStorage.setItem("user", JSON.stringify(personne));
        console.log(JSON.parse(localStorage.getItem("user")));

        //-----
      } );
      

});

function checkQuantity(qte) {

  if (qte < 1 || qte > 100) {
    alert("La valeur doit être comprise entre 0 et 100");
    document.querySelector("#quantity").value = 1;
    return;
  }
}

function checkColor() {
  let color = document.querySelector("#colors").value;

  if (color === "" || color === null) {
    alert("Veuillez choisir une couleur");
    return;
  }
}