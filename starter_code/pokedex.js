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
  let mypokemon
  let gameID
  let PID
  let currentP1Hp
  let currentP2hp
  let shownbuffp1
  let shownbuffp2
  let showndebuffp1
  let showndebuffp2


  /**
   *  init() function  will be called when the window is loaded.
   */
  window.addEventListener("load", init);


  function init() {
    requestAllNames()
    shownbuffp1 = 0
    shownbuffp2 = 0
    showndebuffp1 = 0
    showndebuffp2 = 0
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
  async function requestMove() {
    //getting the move name of what you clicked
    let moveEle = this.getElementsByClassName("move")
    let moveName = moveEle[0].innerText
    moveName = moveName.toLowerCase()
    moveName = moveName.replace(/\s/g, '')
    //console.log(moveName)
    //post request


    let battleURL = `${baseURL}game.php?`
    let param = new FormData
    param.append("guid", gameID)
    param.append("pid", PID)
    param.append("movename", moveName)
    const response = await fetch(battleURL, {
      method: "POST",
      body: param
    })
    const data = await response.json()
    postResults(data)
  }

  function postResults(data) {
    let resultcon = document.getElementById("results-container")
    //my moves
    resultcon.innerHTML = `${data.p1.name} used ${data.results["p1-move"]}` + "<br />" +
      `${data.results["p1-move"]} ${data.results["p1-result"]}` + "<br />" + "<br />" +
      //their moves
      `${data.p2.name} used ${data.results["p2-move"]}` + "<br />" +
      `${data.results["p2-move"]} ${data.results["p2-result"]}` + "<br />"

    //update hp value

    currentP1Hp = data.p1["current-hp"]
    currentP2hp = data.p2["current-hp"]
    
    /*
    TODO : if any hp == 0 end game
    THEN: update hp bars
    THEN: add back to pokedex button
    */
    showCard("my-card", data.p1, currentP1Hp)
    showCard("their-card", data.p2, currentP2hp)
    //buffs I think are next
    let p1buff = data.p1.buffs
    let p2buff = data.p2.buffs
    //showing buffs
    if (p1buff.length > shownbuffp1) {
      showBuff(p1buff, shownbuffp1,0)
      shownbuffp1 += 1
    }
    if (p2buff.length > shownbuffp2) {
      showBuff(p2buff, shownbuffp2,1)
      shownbuffp2 += 1
    }
  //debuff time
    let p1debuff = data.p1.debuffs
    let p2debuff = data.p2.debuffs
    //showing debuff
    if (p1debuff.length > showndebuffp1) {
      console.log("mine")
      showDebuff(p1debuff, showndebuffp1,0)
      showndebuffp1 += 1
    }
    if (p2debuff.length > showndebuffp2) {
      console.log("theirs")
      showDebuff(p2debuff, showndebuffp2,1)
      showndebuffp2 += 1
    }
  }

  function showBuff(buffArray, showndebuff,whoms) {
    if (buffArray.length != 0) {
      let wrapper = document.getElementsByClassName("buffs")
      if (wrapper[0].classList.contains("hidden")) {
        wrapper[0].classList.remove("hidden");
      }
      if (wrapper[1].classList.contains("hidden")) {
        wrapper[1].classList.remove("hidden");
      }

      let len = buffArray.length
      let index = len - 1
      if (len > showndebuff) {
        let child = document.createElement("div")
        child.classList.add("buff")
        child.classList.add(buffArray[index])
        wrapper[whoms].append(child)
      }
    }
  }

  function showDebuff(debuffArray, showndebuff,whoms) {
    if (debuffArray.length != 0) {
      let wrapper = document.getElementsByClassName("buffs")
      if (wrapper[0].classList.contains("hidden")) {
        wrapper[0].classList.remove("hidden");
      }
      if (wrapper[1].classList.contains("hidden")) {
        wrapper[1].classList.remove("hidden");
      }

      let len = debuffArray.length
      let index = len - 1
      if (len > showndebuff) {
        let child = document.createElement("div")
        child.classList.add("debuff")
        child.classList.add(debuffArray[index])
        wrapper[whoms].append(child)
      }

    }
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
      getPokemon(this.id)
      mypokemon = this.id;
      let btn_start = document.getElementById("start-btn")
      btn_start.classList.remove("hidden")
      btn_start.addEventListener("click", startBattle)
    } else {
      console.log("not found yet")
    }
  }


  function startBattle() {
    document.getElementById("title").innerHTML = "Pokemon Battle Mode"
    document.getElementById("pokedex-view").classList.toggle("hidden")
    document.getElementById("their-card").classList.toggle("hidden")
    document.getElementById("start-btn").classList.toggle("hidden")
    document.getElementById("flee-btn").classList.toggle("hidden")
    document.getElementById("flee-btn").addEventListener("click",flee)

    document.getElementsByClassName("hp-info")[0].classList.remove("hidden")
    document.getElementById("results-container").classList.toggle("hidden")

    getOponent()
  }
  function flee(){
    console.log("flee")
  }

  async function getOponent() {

    //adding button functionality 
    let moves = qsa(".moves button"); //only do 0->3
    for (let i = 0; i < 4; i++) {
      moves[i].disabled = false;
      moves[i].addEventListener("click", requestMove)
    }
    // TODO: make a POST request to post a Pokemon name and start a battle
    console.log("getting game set up ...")

    //get data BY POST REQUEST FORM
    let battleURL = `${baseURL}game.php?`
    let param = new FormData
    param.append("startgame", true)
    param.append("mypokemon", mypokemon)
    const response = await fetch(battleURL, {
      method: "POST",
      body: param
    })
    const data = await response.json()
    gameID = data.guid
    PID = data.pid
    showCard("their-card", data.p2, currentP2hp)
  }


  //pass this the lowercase name of the pokemon
  function foundPokemon(pokemon) {
    let sprite = document.getElementById(pokemon)
    sprite.classList.add("found")


  }
  async function getPokemon(name) {
    //https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=pikachu
    let pokenameURL = `${baseURL}pokedex.php?pokemon=${name}`
    let response = await fetch(pokenameURL)
    let data = await response.json()
    showCard("my-card", data, currentP1Hp)

  }

  function showCard(cardId, pokemon, currentHP) {
    //get name
    let parent = document.getElementById(cardId)
    let child = parent.getElementsByClassName("name")
    child[0].innerText = pokemon.name
    //hp value
    child = parent.getElementsByClassName("hp")
    if (currentHP != null) {
      child[0].innerText = currentHP

    } else {
      child[0].innerText = pokemon.hp
    }

    //desc
    child = parent.getElementsByClassName("info")
    child[0].innerText = pokemon.info.description
    //pic
    child = parent.getElementsByClassName("pokepic")
    child[0].src = baseURL + pokemon.images.photo
    //type
    child = parent.getElementsByClassName("type")
    child[0].src = baseURL + pokemon.images.typeIcon
    //weakness
    child = parent.getElementsByClassName("weakness")
    child[0].src = baseURL + pokemon.images.weaknessIcon

    // The “moves” attribute includes data about the Pokemon’s moves
    // (between 1 and 4 moves, depending on the Pokemon).
    let btns = qsa("#" + cardId + " .moves button");
    for (let i = 0; i < btns.length; i++) {
      if (pokemon.moves[i]) {
        btns[i].classList.remove("hidden");

        btns[i].children[0].innerText = pokemon.moves[i].name;
        if (pokemon.moves[i].dp) {
          btns[i].children[1].innerText = pokemon.moves[i].dp + " DP";
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