function dexCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;

  return /*html*/ `
      <div class="card dex-card ${firstType}" id="${pokemon.id}" onclick="showDetail(${pokemon.id})">
          <h3 class="capitalize">${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p class="capitalize">${types}</p>
      </div>`;
}

function detailCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;
  const attack = pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat;
  const defense = pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat;

  return /*html*/ `
      <div class="card dex-card ${firstType}" id="${pokemon.id}">
          <h3 class="capitalize">${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p class="capitalize">${types}</p>
          <p>Attack: ${attack}</p>
          <p>Defense: ${defense}</p>
          <p>Height: ${pokemon.height}</p>
          <p>Weight: ${pokemon.weight}</p>
      </div>`;
}

function errorCardTemplate() {
  return /*html*/ `
        <div class="card dex-card error">
          <h3>Oh no!</h3>
          <img class="error-img" src="./assets/img/questionmark.png" alt="Question mark">
          <p>This Pokémon is hiding and won't come out.</p>
        </div>`;
}

function loadingScreenTemplate() {
  return /*html*/ `
      <div class="loader"></div>
      <div class="loading">Loading...</div>
    `;
}
