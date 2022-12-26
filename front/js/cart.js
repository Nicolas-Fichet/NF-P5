/*
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="../images/product01.jpg" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>Nom du produit</h2>
      <p>Vert</p>
      <p>1042,00 €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>
*/

//const urlAPI = "http://localhost:3000/api/products";
let panier = JSON.parse(localStorage.getItem("panierUtilisateur"));
let items = document.querySelector("#cart__items");

for (let i = 0; i < panier.length; i++) {
  let artId = panier[i].id;
  getProductPriceById(artId);
  //let price = response[i].price;

}

//opérateurs ternaires

//On récupère le prix de l'article suivant son id dans l'API avec l'artId (article Id)
async function getProductPriceById(artId) {
  return fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      return res.json();
    })    
    .then((response) => {
      for (let i=0; i<response.length; i++)
      {
        if (response[i]._id == artId)
        {
          //console.log(response[i].price);
          //return response[i].price;
          items.innerHTML += `
          <article class="cart__item" data-id="${artId}" data-color="${panier[i].color}">
            <div class="cart__item__img">
              <img src="${response[i].imageUrl}" alt="${response[i].altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${response[i].name}</h2>
                <p>${panier[i].color}</p>
                <p id="price">${response[i].price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
          `;
        }
      }
    });
}


//changer la quantité d'un produit
let input = document.querySelector('.itemQuantity');
input.addEventListener('change', () => {
  console.log('clic');
});

