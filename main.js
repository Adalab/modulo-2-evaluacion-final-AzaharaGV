"use strict";

const search = document.querySelector(".js-userInput");
const buttonSearch = document.querySelector(".js-button");
const resultContainer = document.querySelector(".js-placeResult");
let searchResult = [];
let defaultImage = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
let favoritesShow = [];

function handlerButtonSearch(event) {
  const userSearch = search.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then((response) => response.json())
    .then((data) => {
      searchResult = data;
      console.log(searchResult);

      introElementsByDom();
    });
}

function introElementsByDom() {
  console.log(searchResult);
  for (const itemSerie of searchResult) {
    const cards = document.createElement("ul");
    resultContainer.appendChild(cards);
    cards.classList = "allSeries";
    const littleCards = document.createElement("li");
    cards.appendChild(littleCards);
    const allInfoCards = document.createTextNode(itemSerie.show.name);
    littleCards.appendChild(allInfoCards);
    const allInfoCardsImage = document.createElement("img");
    littleCards.appendChild(allInfoCardsImage);
    if (itemSerie.show.image === null) {
      allInfoCardsImage.src = defaultImage;
    } else {
      allInfoCardsImage.src = itemSerie.show.image.medium;
    }
  }
}

buttonSearch.addEventListener("click", handlerButtonSearch);
