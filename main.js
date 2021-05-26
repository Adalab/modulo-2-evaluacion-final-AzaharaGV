"use strict";

const search = document.querySelector(".js-userInput");
const buttonSearch = document.querySelector(".js-button");
const resultContainer = document.querySelector(".js-placeResult");
const favoriteContainer = document.querySelector(".js-favorites");
let searchResult = [];
let favoritesShow = [];
let defaultImage = "//via.placeholder.com/210x295/ffffff/666666/?text=TV";
// LLAMAMOS A LA API Y LOS DATOS DE DATA QUE ME INTERESAN
function handlerButtonSearch(event) {
  const userSearch = search.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      searchResult = data;
      introElementsByDom();
      renderFav();
    });
}
console.log(searchResult);
getFromLocalStorage();

// INTRODUZCO EN HTM LOS ELEMENTOS CON APPENCHILD Y SE HACEN VISIBLES
function introElementsByDom() {
  resultContainer.innerHTML = "";
  for (const itemSerie of searchResult) {
    const cards = document.createElement("ul");
    resultContainer.appendChild(cards);
    cards.setAttribute("class", "results-css");
    const littleCards = document.createElement("li");
    littleCards.setAttribute("id", itemSerie.show.id);
    littleCards.setAttribute("class", "cardsResult-css");
    cards.appendChild(littleCards);
    littleCards.setAttribute("class", "js-favoriteSelect");
    const allInfoCards = document.createTextNode(itemSerie.show.name);
    littleCards.appendChild(allInfoCards);
    const allInfoCardsImage = document.createElement("img");
    littleCards.appendChild(allInfoCardsImage);
    if (itemSerie.show.image === null) {
      allInfoCardsImage.src = defaultImage;
    } else {
      allInfoCardsImage.src = itemSerie.show.image.medium;
    }
    makeSelectable();
  }
}

// HAGO QUE LAS TARJETAS SE PUEDAN SELECCIONAR
function makeSelectable() {
  const selectableCard = document.querySelectorAll(".js-favoriteSelect");
  for (const selectableUnit of selectableCard) {
    selectableUnit.addEventListener("click", favoriteSelect);
  }
}
// LAS FUNCIONES SE ACTIVAN CUANDO SE HACE CLICK SOBRE EL BOTON BUSCAR
buttonSearch.addEventListener("click", handlerButtonSearch);

function favoriteSelect(event) {
  const favoriteSerieSelect = event.currentTarget;
  favoriteSerieSelect.classList.toggle("SuperFavoriteSelect");
  const serieId = parseInt(event.currentTarget.id);
  console.log(serieId);
  const indexShow = favoritesShow.findIndex(
    (nuevaFavoritos) => nuevaFavoritos.show.id === serieId
  );
  console.log(indexShow);
  if (indexShow === -1) {
    const seriFavId = searchResult.find(
      (nuevaFavoritos) => nuevaFavoritos.show.id === serieId
    );
    favoritesShow.push(seriFavId);
  } else {
    favoritesShow.splice(indexShow, 1);
  }

  localStorageFavorite();
  renderFav();
}

//Recoger los favoritos
//Pintar los favoritos
function renderFav() {
  favoriteContainer.innerHTML = "";
  const favCards = document.createElement("ul");
  favoriteContainer.appendChild(favCards);
  favCards.setAttribute("class", "favCont");
  getFromLocalStorage();
  for (const itemSerie of favoritesShow) {
    const favLittleCards = document.createElement("li");
    favCards.appendChild(favLittleCards);
    favLittleCards.setAttribute("class", "favoriteSelectRender");
    favLittleCards.setAttribute("id", itemSerie.show.id);
    const tittleFavSerie = document.createElement("h3");
    favLittleCards.appendChild(tittleFavSerie);
    const allInfoFavCards = document.createTextNode(itemSerie.show.name);
    tittleFavSerie.appendChild(allInfoFavCards);
    const allInfoFavCardsImage = document.createElement("img");
    favLittleCards.appendChild(allInfoFavCardsImage);
    if (itemSerie.show.image === null) {
      allInfoFavCardsImage.src = defaultImage;
    } else {
      allInfoFavCardsImage.src = itemSerie.show.image.medium;
    }
  }
}
console.log(renderFav);
//Almaceno datos en el localStorage
function localStorageFavorite() {
  localStorage.setItem("localFavorites", JSON.stringify(favoritesShow));
}

function getFromLocalStorage() {
  // Hay algo en el localStrorage?
  // Si -> Sacar localStorage, parse, asignarselo a favoritesShow y llmar a renderFav()

  const favoriteLocalStorage = JSON.parse(
    localStorage.getItem("localFavorites")
  );
  console.log(favoriteLocalStorage);
  if (favoriteLocalStorage !== null) {
    favoritesShow = favoriteLocalStorage;
  }
}
renderFav();

//Botón de reset

const resetBoton = document.querySelector(".js-resetbutton");
function resetFavorites() {
  localStorage.removeItem("localFavorites");
  favoritesShow = [];
  localStorageFavorite();
  renderFav();
}

resetBoton.addEventListener("click", resetFavorites);
