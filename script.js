function init() {}

async function getData(soughtPokemon) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`;
    let response = await fetch(url);
    let currentSearch = await response.json();
    console.log(currentSearch);
    renderSoughtPokemon(currentSearch);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderSoughtPokemon(currentSearch) {
  let contentContainer = document.getElementById("search-result");
  let currentObject = currentSearch.synsets;
  contentContainer.innerHTML = "";
    contentContainer.innerHTML = /*html*/ `
        <div class="found-pokemon">
            <h3>You found:</h3>
            <h3 class="capitalize">${currentSearch.name}</h3>
            <img src="${currentSearch.sprites.front_default}" alt="${currentSearch.name}">
            <p>Height: ${currentSearch.height}</p>
            <p>Weight: ${currentSearch.weight}</p>
        </div>`;
  for (let i = 0; i < currentObject.length; i++) {
    let foundPokemon = currentObject[i].name;
    console.log(foundPokemon);
    let printableResult = foundPokemon.name;
  }
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
}

function renderPokegallery() {
    let contentContainer = document.getElementById("pokedex");
    contentContainer.innerHTML = "";
    contentContainer.innerHTML = /*html*/`
        
    `
}

function render() {
    for (let i = 1; i < photos.length + 1; i++) {
      document.getElementById("gallery").innerHTML += renderGallery(i);
    }
  }
  
  function renderGallery(i) {
    return `
   <div class="photosquare">
      <img class="photopreview" onclick="showDetail(${i})" src="./img/${i}.jpg" alt"photo ${i}">
    </div>`;
  }