
(function(){
  "use strict";

  // MODULE GLOBAL VARIABLES, CONSTANTS
  const BASE_URL = "";
  let starterPokemon = ["Bulbasaur", "Charmander", "Squirtle"];


  /**
   *  init() function  will be called when the window is loaded.
   */
  window.addEventListener("load", init);


  function init(){


  }


  /**
   * make a GET request to get all 151 Pokemon sprite names
   */
  function requestAllNames(){


  }


  /**
   * make a POST request to request info of a Pokemon
   * @param {string} name A pokemon name
   */
  function requestByName(name){

  }

  /**
   * make a POST request to send a Pokemon name and start a battle
   * @param {string} name A pokemon name
   */
  function requestBattle(name){

  }


  /**
   * make a POST request to send a move of the battle
   * @param {string} movename name of a move
   */
  function requestMove(movename){

  }


  /**
   * parse the returned text from API to a 2D array
   * @param {string} text A string of all 151 Pokemon sprite names
   * @returns {array} A 2D array of 151 Pokemon sprite names
   */
  function getName(text) {
    let names = text.split("\n");
    for(let i=0; i<names.length; i++) {
      names[i] = names[i].split(":");
    }
    return names;
  }

  /* write your helper function below */






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
