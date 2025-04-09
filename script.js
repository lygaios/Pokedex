let currentOffset = 0;
const limit = 20;

function init() {
  getDexData(currentOffset, limit);
}

function renderLoadingScreen() {
  let loadingOverlay = document.getElementById("loading-overlay");

  loadingOverlay.innerHTML = loadingScreenTemplate();
  loadingOverlay.classList.remove("dnone");

  document.getElementById("load-more-button").disabled = true;
}


function hideLoadingScreen() {
  let loadingOverlay = document.getElementById("loading-overlay");

  loadingOverlay.classList.add("dnone");
  loadingOverlay.innerHTML = ""; 

  document.getElementById("load-more-button").disabled = false;
}


async function getDexData(offset = 0, limit = 20) {
  try {
    renderLoadingScreen();

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseToJson = await response.json();

    console.log(responseToJson);

    await renderCollection(responseToJson);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoadingScreen();
  }
}

async function renderCollection(pokeCollection) {
  let contentContainer = document.getElementById("pokedex");

  for (let i = 0; i < pokeCollection.results.length; i++) {
    let pokemonEntry = pokeCollection.results[i];

    try {
      let response = await fetch(pokemonEntry.url);
      let pokemon = await response.json();

      let types = pokemon.types.map((t) => t.type.name).join(", ");
      contentContainer.innerHTML += dexCardTemplate(pokemon, types);
    } catch (error) {
      console.error(`Error fetching data for ${pokemonEntry.name}:`, error);
      contentContainer.innerHTML += errorCardTemplate();
    }
  }

  hideLoadingScreen();
}

function loadMore() {
  currentOffset += limit;
  getDexData(currentOffset, limit);
}

function sendSearch() {
  let soughtPokemon = document.getElementById("search-field").value;
  getData(soughtPokemon);
}

async function getData(soughtPokemon) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`;
    let response = await fetch(url);
    let pokemon = await response.json();

    let types = pokemon.types.map((t, index) => t.type.name).join(", ");

    console.log(pokemon);
    renderSoughtPokemon(pokemon, types);
  } catch (error) {
    console.error("Error fetching data:", error);
    renderSearchErrorCard();
  }

  document.getElementById("search-field").value = "";
}

function renderSoughtPokemon(pokemon, types) {
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  contentContainer.innerHTML = dexCardTemplate(pokemon, types);
}

function renderSearchErrorCard() {
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  contentContainer.innerHTML += errorCardTemplate();
}

function renderDexErrorCard() {
  let contentContainer = document.getElementById("pokedex");
  contentContainer.innerHTML += errorCardTemplate();
}
