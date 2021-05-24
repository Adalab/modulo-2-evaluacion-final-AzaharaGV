"use strict";

const search = document.querySelector(".js-userInput");
const buttonSearch = document.querySelector(".js-button");
const resultContainer = document.querySelector(".js-placeResult");
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
    });
}

// INTRODUZCO EN HTM LOS ELEMENTOS CON APPENCHILD Y SE HACEN VISIBLES
function introElementsByDom() {
  resultContainer.innerHTML = "";
  for (const itemSerie of searchResult) {
    const cards = document.createElement("ul");
    resultContainer.appendChild(cards);
    cards.classList = "allSeries";
    const littleCards = document.createElement("li");
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
  favoriteSerieSelect.classList.toggle("js-favoriteSelect");
}
