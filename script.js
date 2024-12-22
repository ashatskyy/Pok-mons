"use strict";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");


const fromInput__Temporary = "escavalier";

let checkBase;
let targetBase;

fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => res.json())
  .then((data) => {
    checkBase = data;
  })
  .catch((err) => {
    alert("There was an error loading data base");
  });

searchButton.addEventListener("click", () => {
	let pokemonDataBase; 

	if (Number(searchInput.value)) {
		pokemonDataBase = checkBase.results.find(
			(data) => data.id === +searchInput.value
		);
	} else { 

		pokemonDataBase = checkBase.results.find(
			(data) => data.name === (searchInput.value).toLocaleLowerCase()
		);
		
	}


  if (pokemonDataBase) {
    pokemonDataBase = pokemonDataBase.url;
    fetch(pokemonDataBase)
      .then((res) => res.json())
      .then((data) => {
        targetBase = data;
        pokemonId.textContent = `#${targetBase.id}`;
        pokemonName.textContent = targetBase.name.toUpperCase();
        pokemonWeight.textContent = `Weight: ${targetBase.weight}`;
        pokemonHeight.textContent = `Height: ${targetBase.height}`;
        pokemonImage.innerHTML = `<img src="${targetBase.sprites.front_default}" id="sprite"/>`;

				pokemonTypes.innerHTML = '';
        targetBase.types.forEach((el, index) => {
          pokemonTypes.innerHTML += `<div class="type-slot ${
            targetBase.types[index].type.name
          }">${targetBase.types[index].type.name.toUpperCase()}</div>`;
				});
				
				pokemonHp.textContent = targetBase.stats[0].base_stat;
				pokemonAttack.textContent = targetBase.stats[1].base_stat;
				pokemonDefense.textContent = targetBase.stats[2].base_stat;
				pokemonSpecialAttack.textContent = targetBase.stats[3].base_stat;
				pokemonSpecialDefense.textContent = targetBase.stats[4].base_stat;
				pokemonSpeed.textContent = targetBase.stats[5].base_stat;
      })
      .catch((err) => {
        alert("There was an error loading data base");
      });
  } else {
    alert("Pokémon not found");
  }
});
