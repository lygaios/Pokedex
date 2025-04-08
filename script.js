function init() {}

async function getData(soughtPokemon) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`;
    let response = await fetch(url);
    let currentSearch = await response.json();
    console.log(currentSearch);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  renderSoughtPokemon(currentSearch);
}

function renderSoughtPokemon(currentSearch) {
  let contentContainer = document.getElementById("search-result");
  let currentObject = currentSearch.synsets;
  contentContainer.innerHTML = "";

  for (let i = 0; i < currentObject.length; i++) {
    const element = currentObject[i];
    console.log(element);
    let printableResult = element.terms;

    for (let j = 0; j < printableResult.length; j++) {
      const element = printableResult[j].term;
      contentContainer.innerHTML += /*html*/ `
        <div>${element}</div>
      `;
    }
  }
}

function sendSearch() {
  let soughtPokemon = document.getElementById("search-field").value;
  getData(soughtPokemon);
}
