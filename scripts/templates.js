function dexCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;

  return /*html*/ `
      <div class="card dex-card ${firstType}" id="${pokemon.id}" onclick="showDetail(${pokemon.id})">
          <h3 class="capitalize">${pokemon.name}</h3>
          <img class="poke-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p class="capitalize">${types}</p>
      </div>`;
}

function detailCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;
  const hp = pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat;
  const attack = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat;
  const defense = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat;
  const previousButton = pokemon.id > 1 ? `<button class="button" onclick="showDetail(${pokemon.id - 1})"><</button>` : "";
  const nextButton = pokemon.id < 493 ? `<button class="button" onclick="showDetail(${pokemon.id + 1})">></button>` : "";

  return /*html*/ `
      <div class="card detail-card ${firstType}" id="${pokemon.id}">
        <h3 class="capitalize">${pokemon.name}</h3>
        <img class="poke-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p class="capitalize">${types}</p>
        <p>HP: ${hp}</p>
        <p>Attack: ${attack}</p>
        <p>Defense: ${defense}</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <div class="nav-buttons">
          ${previousButton}
          <p>${pokemon.id} / 493</p>
          ${nextButton}
        </div>
        
      </div>`;
}

function loadingScreenTemplate() {
  return /*html*/ `
        <div class="loader"></div>
        <div class="loading">Loading...</div>
      `;
}

function errorCardTemplate() {
  return /*html*/ `
        <div class="card dex-card error" onclick="clearError()">
          <h3>Oh no!</h3>
          <img class="error-img" src="./assets/img/questionmark.png" alt="Question mark">
          <p>This Pokémon is hiding and won't come out.</p>
        </div>`;
}

function searchEmptyTemplate() {
  return /*html*/ `
      <div class="card dex-card error" onclick="clearError()">
        <p>Please enter a Pokémon name or ID number.</p>
      </div>
    `;
}

function searchShortTemplate() {
  return /*html*/ `
      <div class="card dex-card error" onclick="clearError()">
        <p>Please enter at least 3 letters. You can also enter an ID number instead.</p>
      </div>
    `;
}
