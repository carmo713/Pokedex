
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertbasestats(pokemonStats){
return pokemonStats.map((statSlot) => `<li class= "detalhes">${statSlot.stat.name}: ${statSlot.base_stat}</li>`)

}


loadPokemonItens(offset, limit)

function loadPokemonItens(offset, limit){

  pokeApi.getPokemon(offset, limit).then((pokemons = []) => {

    const newHtml = pokemons.map((pokemon) =>
      `<li class="pokemon ${pokemon.type}">
                  <span class="number">#${pokemon.number}</span>
                  <span class="name">${pokemon.name}</span>
                  
                  <div class = "detail">
                      <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                      </ol>
                  
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                  </div>
                 
                
                      <ol class="detalhe">
                      <li class = "detalhes">height:  ${pokemon.height}</li>
                        ${convertbasestats(pokemon.stats).join('')}
                      </ol>
              </li>`
    ).join('')


      pokemonList.innerHTML += newHtml 
  })
    
      
}
    






loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItens(offset, newLimit)

      loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
      loadPokemonItens(offset, limit)
  }
})