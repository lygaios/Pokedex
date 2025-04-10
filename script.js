let pokemonNames = [];

let currentOffset = 0;
const limit = 20;

function init() {
  getDexData(currentOffset, limit);
  loadPokemonNames();
  getAutocompleteSearch();
}

function toggleLoadingScreen(isVisible) {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadMoreButton = document.getElementById("load-more-button");
  if (isVisible) {
    loadingOverlay.innerHTML = loadingScreenTemplate();
    loadingOverlay.classList.remove("dnone");
    loadMoreButton.disabled = true;
  } else {
    loadingOverlay.classList.add("dnone");
    loadingOverlay.innerHTML = "";
    loadMoreButton.disabled = false;
  }
}

function renderLoadingScreen() {
  toggleLoadingScreen(true);
}

function hideLoadingScreen() {
  toggleLoadingScreen(false);
}

async function loadPokemonNames() {
  const maxPokemon = 493;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=0`;
  const response = await fetch(url);
  const data = await response.json();
  pokemonNames = data.results.map((p) => p.name);
}

function getAutocompleteSearch() {
  const searchField = document.getElementById("search-field");
  searchField.addEventListener("input", autocompleteSearch);
}

function autocompleteSearch() {
  const searchField = document.getElementById("search-field");
  const input = searchField.value.toLowerCase();
  if (!input || input.length < 3) return;
  const match = pokemonNames.find((name) => name.startsWith(input));
  if (match) {
    searchField.value = match;
    searchField.setSelectionRange(input.length, match.length);
  }
}

async function getDexData(offset = 0, limit = 20) {
  try {
    renderLoadingScreen();
    const maxPokemon = 493;

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${Math.min(limit, maxPokemon - offset)}&offset=${offset}`;
    let response = await fetch(url);
    let responseToJson = await response.json();
    await renderCollection(responseToJson);
  } catch (error) {
    renderDexErrorCard();
  } finally {
    hideLoadingScreen();
  }
}

async function renderCollection(pokeCollection) {
  let contentContainer = document.getElementById("pokedex");
  for (let i = 0; i < pokeCollection.results.length; i++) {
    let pokemonEntry = pokeCollection.results[i];
    try {
      const response = await fetch(pokemonEntry.url);
      const pokemon = await response.json();
      const types = pokemon.types.map((t) => t.type.name).join(", ");
      contentContainer.innerHTML += dexCardTemplate(pokemon, types);
    } catch (error) {
      renderDexErrorCard();
    }
  }
}

function loadMore() {
  currentOffset += limit;
  getDexData(currentOffset, limit);
}

function sendSearch() {
  let soughtPokemon = document.getElementById("search-field").value.trim().toLowerCase();
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  if (!soughtPokemon) {
    renderSearchErrorMessage(searchEmptyTemplate);
  } else if (isNaN(soughtPokemon) && soughtPokemon.length < 3) {
    renderSearchErrorMessage(searchShortTemplate);
  } else if (isNaN(soughtPokemon) && !pokemonNames.includes(soughtPokemon)) {
    renderSearchErrorCard();
  } else getData(soughtPokemon);
}

async function getData(soughtPokemon) {
  closeAndClearOverlay();
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`;
    const response = await fetch(url);
    if (!response.ok) {
      renderSearchErrorCard();
      return;
    }
    const pokemon = await response.json();
    if (pokemon.id > 493 || pokemon.id < 1) {
      renderSearchErrorCard();
      return;
    }
    const types = pokemon.types.map((t) => t.type.name).join(", ");
    renderSoughtPokemon(pokemon, types);
  } catch (error) {
    renderSearchErrorCard();
  }
  document.getElementById("search-field").value = "";
}

function renderSearchAnswer(theAnswer) {
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  contentContainer.innerHTML = theAnswer;
}

function renderSoughtPokemon(pokemon, types) {
  renderSearchAnswer(dexCardTemplate(pokemon, types));
}

function renderSearchErrorMessage(searchErrorMessage) {
  renderSearchAnswer(searchErrorMessage());
}

function renderSearchErrorCard() {
  renderSearchAnswer(errorCardTemplate());
}

function renderDexErrorCard() {
  let contentContainer = document.getElementById("pokedex");
  contentContainer.innerHTML += errorCardTemplate();
}

async function showDetail(pokemonId) {
  try {
    renderLoadingScreen();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    const types = pokemon.types.map((t) => t.type.name).join(", ");
    const overlay = document.getElementById("detail-overlay");
    overlay.innerHTML = detailCardTemplate(pokemon, types);
    overlay.classList.remove("dnone");
    document.body.classList.add("noscroll");
  } catch (error) {
    renderSearchErrorCard();
  } finally {
    hideLoadingScreen();
  }
}

function closeDetailOverlay(event) {
  if (event.target.id === "detail-overlay") {
    closeAndClearOverlay();
  }
}

function closeAndClearOverlay() {
  const detailOverlay = document.getElementById("detail-overlay");
  detailOverlay.classList.add("dnone");
  detailOverlay.innerHTML = "";
  document.body.classList.remove("noscroll");
}

function clearError() {
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  document.getElementById("search-field").value = "";
}
