function init() {

}


async function getData(soughtPokemon) {

    let url = `https://pokeapi.co/api/v2/pokemon/${soughtPokemon}`
    let response = await fetch(url);
    let currentRequest = await response.json();
  
    renderRequest(currentRequest);
  }
  
  function renderRequest(currentRequest) {
    let contentContainer = document.getElementById("search-result");
    let currentObject = currentRequest.synsets;
    contentContainer.innerHTML = "";
  
    for (let i = 0; i < currentObject.length; i++) {
      const element = currentObject[i];
      console.log(element);
      let printableResult = element.terms;
  
      for (let j = 0; j < printableResult.length; j++) {
        const element = printableResult[j].term;
        contentContainer.innerHTML += /*html*/`
        <div>${element}</div>
      `
      }
    }
  }
  
  function sendSearch(){
    let soughtPokemon = document.getElementById("search-field").value;
    getData(soughtPokemon);
  }