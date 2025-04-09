function dexCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;

  return /*html*/ `
      <div class="card dex-card ${firstType}" id="${pokemon.id}">
          <h3 class="capitalize">${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p class="capitalize">${types}</p>
      </div>`;
}

function detailCardTemplate(pokemon, types) {
  const firstType = pokemon.types[0].type.name;

  return /*html*/ `
      <div class="card dex-card ${firstType}" id="${pokemon.id}">
          <h3 class="capitalize">${pokemon.name}</h3>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>ID: ${pokemon.id}</p>
          <p class="capitalize">${types}</p>
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
