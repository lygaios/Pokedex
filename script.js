function init() {
  getDexData();
}

async function getData(soughtPokemon) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    console.log(pokemon);
    renderSoughtPokemon(pokemon);
  } catch (error) {
    console.error("Error fetching data:", error);
    renderSearchErrorCard();
  }
  document.getElementById("search-field").value = "";
}

function renderSoughtPokemon(pokemon) {
  let contentContainer = document.getElementById("search-result");
  contentContainer.innerHTML = "";
  contentContainer.innerHTML = dexCardTemplate(pokemon);
}

function sendSearch() {
  let soughtPokemon = document.getElementById("search-field").value;
  getData(soughtPokemon);
}

function renderLoadingScreen() {
  let contentContainer = document.getElementById("pokedex");
  contentContainer.innerHTML = /*html*/ `
        <div class="loading">Loading...</div>
    `;
  contentContainer.innerHTML = "";
}

async function getDexData() {
  try {
    renderLoadingScreen();
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`;
    let response = await fetch(url);
    let responseToJson = await response.json();
    console.log(responseToJson);
    renderCollection(responseToJson);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function renderCollection(pokeCollection) {
  let contentContainer = document.getElementById("pokedex");
  contentContainer.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    let pokemonEntry = pokeCollection.results[i];

    try {
      let response = await fetch(pokemonEntry.url);
      let pokemon = await response.json();
      contentContainer.innerHTML += dexCardTemplate(pokemon);
    } catch (error) {
      console.error(`Error fetching data for ${pokemonEntry.name}:`, error);
      renderDexErrorCard();
    }
  }
}

function dexCardTemplate(pokemon) {
  return /*html*/ `
           <div class="card dex-card" id="${pokemon.id}">
               <h3 class="capitalize">${pokemon.name}</h3>
               <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
               <p>Height: ${pokemon.height}</p>
               <p>Weight: ${pokemon.weight}</p>
           </div>`;
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

function errorCardTemplate() {
  return /*html*/ `
      <div class="card dex-card error">
        <h3>"Oh no!"</h3>
        <img class="error-img" src="./assets/img/questionmark.png" alt="Question mark">
        <p>This Pokémon is hiding and won't come out.</p>
      </div>`;
}
