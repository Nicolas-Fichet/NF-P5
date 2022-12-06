//Variables Globales

const urlAPI = "http://localhost:3000/api/products";

// -------------

// Récupérer l'id dans l'url
var str = document.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

let curentArticle = document.querySelector(".item");

// -------------

fetch(urlAPI+"/"+id)
    .then(response => response.json())
      
    .then(kanaps => {
        //Menu déroulant choix des couleurs
        let choixCouleur = `<option value="">-- SVP, choisissez une couleur --</option>`;
        kanaps.colors.forEach(couleur => {
            choixCouleur += `<option value=${couleur}>${couleur}</option>`;
            //console.log(color)
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

      // Action ajouter au panier 
        let bouton = document.querySelector('#addToCart');
        bouton.addEventListener("click", () => {
        let nombreObjetCommande = document.querySelector("#quantity").value;
        checkColor();
        checkQuantity(nombreObjetCommande);


        let commande = {
          id: id,
          name: kanaps.name,
          color: document.querySelector("#colors").value,
          quantity: parseInt(nombreObjetCommande),
          imageUrl: kanaps.imageUrl,
          altTxt: kanaps.altTxt,
        }

        localStorageInfo(commande);


        //console.log(commande.quantity);
        //console.log(commande.color);
        //console.log(commande.id);

        //localStorage.setItem("panierUtilisateur", JSON.stringify(commande));     //stock l'objet dans le local storage et (transforme/remet l'objet data en string au format JSON)
        console.log("Rapport contenu localStorage", JSON.parse(localStorage.getItem("panierUtilisateur")));      // récupère l'information au format JSON et "parse" retransforme le string JSON en objet  PRESQUE^^

        });
});

// Fonction check quantité
function checkQuantity(qte) {
  if (qte < 1 || qte > 100) {
    alert("La valeur doit être comprise entre 0 et 100");
    document.querySelector("#quantity").value = 1;
    // on remet la valeur dans la plage autorisée
    return;
  }
}

//Fonction check color
function checkColor() {
  let color = document.querySelector("#colors").value;
  if (color === "" || color === null) {
    alert("Veuillez choisir une couleur");
    return;
  }
}

//---------------------------------------------
// V2

//Fonction edition localStorage
function localStorageInfo (commande) {
    let currentLocalStorage = JSON.parse(localStorage.getItem("panierUtilisateur")) || [];
    let infoEnCours ;
    console.log("Initital LocalStorage", currentLocalStorage);
    
    if (currentLocalStorage.length < 1) {   //vide Cas 1
      console.log ("cas 1 AJOUTER")
      currentLocalStorage.push(commande);
    } else if (currentLocalStorage.length >= 1) {
      for (let i = 0; i < currentLocalStorage.length; i++) {
        console.log("tour", i+1);
        if (currentLocalStorage[i].id == commande.id && currentLocalStorage[i].color == commande.color) {   //correspondance Cas 2
          console.log ("cas 2 Quantity")
          currentLocalStorage[i].quantity += parseInt(commande.quantity);
          localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
          return;
        } else if (currentLocalStorage[i].id !== commande.id || (currentLocalStorage[i].id == commande.id && currentLocalStorage[i].color !== commande.color)) {  //non correspondance Cas 3
          console.log ("cas 3 Nouvelle Entrée")
          infoEnCours = commande;
        }
      }
    }
    if (infoEnCours != null) {
      currentLocalStorage.push(infoEnCours);
      }

    localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
    return;
};

//-----------------------------------------------------
// V3.qui marche pas 
/*
currentLocalStorage.id.forEach(i => {
  if (currentLocalStorage[i].id == commande.id && currentLocalStorage[i].color == commande.color) {   //correspondance Cas 2
    console.log ("cas 2")
    currentLocalStorage[i].quantity += parseInt(commande.quantity);
  } else if (currentLocalStorage[i].id !== commande.id || (currentLocalStorage[i].id == commande.id && currentLocalStorage[i].color !== commande.color)) {
    currentLocalStorage.push(commande);
  }
});
*/
/*
//Fonction edition localStorage
function localStorageInfo (commande) {
  let currentLocalStorage = JSON.parse(localStorage.getItem("panierUtilisateur")) || [];
  console.log("currentLocalStorage", currentLocalStorage);
  
  if (currentLocalStorage.length < 1) {   //vide Cas 1
    console.log ("cas 1")
    currentLocalStorage.push(commande);    
  } else if (currentLocalStorage.length >= 1) {
    currentLocalStorage.forEach(i => {
      if (i.id == commande.id && i.color == commande.color) {   //correspondance Cas 2
        console.log ("cas 2")
        i.quantity += parseInt(commande.quantity);
      } else if (i.id !== commande.id || (i.id == commande.id && i.color !== commande.color)) {  //non correspondance Cas 3
        console.log ("cas 3")
        //currentLocalStorage.push(commande);
        var infoEnCours = commande;
      }
      if (infoEnCours !== null) {
        currentLocalStorage.push(infoEnCours);
      }
    } 
    );
  }
  localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
  return;
};

*/
//-------------------------------------------------
//V1
/*

//Fonction edition localStorage
function localStorageInfo (panier) {
  let currentLocalStorage = localStorage.getItem("panierUtilisateur") || [];
  if (currentLocalStorage.length < 1) {   // ici pk condition seulement si inf a 1 
    currentLocalStorage.push(panier);
    localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
  } else if (currentLocalStorage.length >= 1) {
    checkDoublons();
  }
}
//fct qui dit si le nombre d'élement du tableau currentLocalStorage est inférieur a 1 - alors - ajoute le contenu du panier au tableau currentLocalStorage 
for (let index = 0; index < array.length; index++) {
  const element = array[index];
  
}
//Fonction Check Doublons
function checkDoublons (currentLocalStorage, panier) {
  for (let i = 0; i < currentLocalStorage.length; i++) {
    if (currentLocalStorage[i].id == panier.id && currentLocalStorage[i].color == panier.color) {
      currentLocalStorage[i].quantity += parseInt(panier.quantity);
      localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
      return;
    }
  }
}
//fct qui dit pour tous les élements du tableau currentLocalStorage si l'id ET color = panier id ET color - alors - ajoute les quantités - enfin - édite le local storage -  

*/
//-------------------------------------------------------------------
/*

// On initialise notre cartObject, si il ne contient rien, on en fait un tableau vide
// Dans le code voir cartObject comme un caddie et cartItem comme un article dans le caddie.
      let currentLocalStorage = localStorage.getItem("panierUtilisateur") || [];
      if (currentLocalStorage.length < 1) {
        currentLocalStorage.push(panier);
        localStorage.setItem("panierUtilisateur", JSON.stringify(currentLocalStorage));
      }

// Si on trouve un doublon (id, couleur) on augmente que la quantité et on replace dans le localStorage
        for (let i = 0; i < currentLocalStorage.length; i++) {
          if (currentLocalStorage[i].id == cartItem.id && currentLocalStorage[i].color == cartItem.color) {
            currentLocalStorage[i].quantity += parseInt(cartItem.quantity);
            localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
            return;
          } // pour chaque element de mon local storage, Si ID ET color du local storage sont égaux a ID et color de cart ITem  Alors on ajoute/modifie la valeur quantité correspondant  puis réenvoi au local storage
        }

*/