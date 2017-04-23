/* Generates and returns wizard's objects and other data */

'use strict';

window.data = (function () {

  var COUNT = 10;
  var DRAWING_COUNT = 4;
  var wizardList = [];

  var information = {
    name: {
      first: [
        'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
        'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
      ],
      last: [
        'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
        'Топольницкая', 'Нионго', 'Ирвинг'
      ]
    },

    color: {
      coat: [
        'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
        'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
      ],
      eyes: [
        'black', 'red', 'blue', 'yellow', 'green'
      ],
      fireball: [
        '#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'
      ]
    }
  };

  /* ---------------------------------------------------------------------------
   * Returns an array with random values
   * @param {Array.<string>} - array for processing
   * @param {number} - values count
   * @return {Array.<string>}
   */
  function randomVariables(array, count) {
    var result = [];
    var random = null;

    for (var i = 0; i < count; i++) {
      random = Math.floor(Math.random() * array.length);
      result.push(array[random]);
    }

    return result;
  }

  /* ---------------------------------------------------------------------------
   * Generates and returns an array of full names
   * @param {Array.<string>} - first names array
   * @param {Array.<string>} - last names array
   * @return {Array.<string>}
   */
  function makeFullNames(first, last) {
    var fullNames = [];
    for (var i = 0; i < first.length; i++) {
      fullNames[i] = first[i] + ' ' + last[i];
    }
    return fullNames;
  }

  /* ---------------------------------------------------------------------------
   * Generates random wizard's data
   */
  function generateRandomData() {
    var firstNames = randomVariables(information.name.first, COUNT);
    var lastNames = randomVariables(information.name.last, COUNT);
    var fullNames = makeFullNames(firstNames, lastNames);
    var coats = randomVariables(information.color.coat, COUNT);
    var eyes = randomVariables(information.color.eyes, COUNT);
    var fireball = randomVariables(information.color.fireball, COUNT);

    for (var i = 0; i < COUNT; i++) {
      wizardList[i] = {
        name: fullNames[i],
        colorCoat: coats[i],
        colorEyes: eyes[i],
        colorFireball: fireball[i]
      };
    }
  }

  /* ---------------------------------------------------------------------------
   * Processes the response from the server
   * @param {Object} - event object
   */
  function getAnswerHandler(event) {
    /* Waiting for a response from the server */
    if (event.target.readyState === 4) {
      var message = '';

      switch (event.target.status) {
        case 200:
          /* If the query is successful, save the data */
          message = 'Данные успешно получены!';
          wizardList = JSON.parse(event.target.responseText);
          break;
        default:
          /* With any error, generate random data */
          message = 'Сервер не отвечает, данные сформированы случайным образом.';
          generateRandomData();
      }

      window.popup(document.body, message);

      window.similarWizards.draw();
    }
  }


/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Make a request to the server to get the initial data
     */
    init: function () {
      var requestUrl = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/code-and-magick/data';
      window.load(requestUrl, getAnswerHandler);
    },

    /* -------------------------------------------------------------------------
     * Returns wizard's object by index
     * @param {number} - index
     * @return {Object}
     */
    getWizard: function (index) {
      return wizardList[index];
    },

    /* -------------------------------------------------------------------------
     * Returns an array with wizard's objects
     * @return {Array<Object>}
     */
    getWizardList: function () {
      var wizards = wizardList.slice(0, DRAWING_COUNT);
      return wizards;
    },

    /* -------------------------------------------------------------------------
     * Returns the colors for the required item
     * @param {string} - item name
     * @return {Array<string>}
     */
    getColor: function (item) {
      return information.color[item];
    }

  };

})();
