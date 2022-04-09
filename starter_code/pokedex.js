
/* step 1: populate sprites for right box (#pokedex-veiw)
 *   pokedex.php?pokedex=all. 
 *   getting all sprites use url +pokemonname.png
 *   https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/
 *   Should have class of .sprite the .found (helpful give ID of pokemon name)
 *
 */
(function () {
  "use strict";

  // MODULE GLOBAL VARIABLES, CONSTANTS
  const baseURL = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/";
  let starterPokemon = ["bulbasaur", "charmander", "squirtle"];
  let allNames


  /**
   *  init() function  will be called when the window is loaded.
   */
  window.addEventListener("load", init);


  function init() {
    requestAllNames()

  }


  /**
   * make a GET request to get all 151 Pokemon sprite names
   * https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokedex=all
   */
  async function requestAllNames() {
    const allURL = `${baseURL}pokedex.php?pokedex`
    const response = await fetch(allURL)
    const data = await response.text()
    allNames = getName(data)

    filldex(allNames)

  }


  /**
   * make a POST request to request info of a Pokemon
   * @param {string} name A pokemon name
   */
  function requestByName(name) {

  }

  /**
   * make a POST request to send a Pokemon name and start a battle
   * @param {string} name A pokemon name
   */
  function requestBattle(name) {

  }


  /**
   * make a POST request to send a move of the battle
   * @param {string} movename name of a move
   */
  function requestMove(movename) {

  }


  /**
   * parse the returned text from API to a 2D array
   * @param {string} text A string of all 151 Pokemon sprite names
   * @returns {array} A 2D array of 151 Pokemon sprite names
   */
  function getName(text) {
    let names = text.split("\n");
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i].split(":");
    }
    return names;
  }

  /* write your helper function below */
  // https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/
  function filldex(allNames) {
    let spriteURl = "https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/"
    const view_box = document.getElementById("pokedex-view")
    allNames.forEach(pokemon => {
      view_box.innerHTML += `<img id="${pokemon[1]}" src="${spriteURl}${pokemon[1]}.png" class="sprite">`

    });

    let pokearr = document.getElementsByClassName("sprite")
    for (let i = 0; i < pokearr.length; i++) {
      pokearr[i].addEventListener("click", selectPokemon)

    }
    starterPokemon.forEach(pokemon => {
      foundPokemon(pokemon)
    });

  }

  function selectPokemon() {
    if (this.classList.contains("found")) {
      console.log("found")
      getPokemon(this.id)
    } else {
      console.log("not found yet")
    }
    

  }

  //pass this the lowercase name of the pokemon
  function foundPokemon(pokemon) {
    let sprite = document.getElementById(pokemon)
    sprite.classList.add("found")
    console.log(sprite)

  }
  async function getPokemon(name) {
    //https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=pikachu
    let pokenameURL = `${baseURL}pokedex.php?pokemon=${name}`
    let response = await fetch(pokenameURL)
    let data = await response.json()
    showcard("my-card", data)

  }

  function showcard(cardId, pokemon) {
    //get name
    let parent = document.getElementById(cardId)
    let child = parent.getElementsByClassName("name")
    child[0].innerText = pokemon.name
    //hp value
    child = parent.getElementsByClassName("hp")
    child[0].innerText = pokemon.hp
    //desc
    child = parent.getElementsByClassName("info")
    child[0].innerText = pokemon.info.description
    //pic
    child = parent.getElementsByClassName("pokepic")
    child[0].src = baseURL+pokemon.images.photo
    //type
    child = parent.getElementsByClassName("type")
    child[0].src = baseURL+pokemon.images.typeIcon
    //weakness
    child = parent.getElementsByClassName("weakness")
    child[0].src = baseURL +pokemon.images.weaknessIcon

    // The “moves” attribute includes data about the Pokemon’s moves
    // (between 1 and 4 moves, depending on the Pokemon).
    let btns = qsa("#" + cardId + " .moves button");
    for (let i = 0; i < btns.length; i++) {
      if (pokemon.moves[i]) {
        btns[i].classList.remove("hidden");
        btns[i].children[0].innerText = pokemon.moves[i].name;
        if (pokemon.moves[i].dp) {
          btns[i].children[1].innerText = pokemon.moves[i].dp;
        }
        let url = baseURL + "icons/" + pokemon.moves[i].type + ".jpg";
        btns[i].children[2].src = url;
        btns[i].children[2].alt = pokemon.moves[i].type;
      } else {
        btns[i].classList.add("hidden");
      }
    }
  }


  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }


})();