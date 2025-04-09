function dexCardTemplate(pokemon, types) {
    return /*html*/ `
             <div class="card dex-card" id="${pokemon.id}">
                 <h3 class="capitalize">${pokemon.name}</h3>
                 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                 <p>ID: ${pokemon.id}</p>
                 <p class="capitalize">${types}</p>
             </div>`;
  }

  function detailCardTemplate(pokemon, types) {
    return /*html*/ `
             <div class="card dex-card" id="${pokemon.id}">
                 <h3 class="capitalize">${pokemon.name}</h3>
                 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                 <p>ID: ${pokemon.id}</p>
                 <p class="capitalize">${types}</p>
                 <p>Height: ${pokemon.height}</p>
                 <p>Weight: ${pokemon.weight}</p>
             </div>`;
  }