/* Generates and returns wizard's objects and other data */

'use strict';

window.data = (function () {

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

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Creates an array with wizard's objects
     * @param {number} - wizard's count
     */
    init: function (count) {
      var firstNames = randomVariables(information.name.first, count);
      var lastNames = randomVariables(information.name.last, count);
      var fullNames = makeFullNames(firstNames, lastNames);
      var coats = randomVariables(information.color.coat, count);
      var eyes = randomVariables(information.color.eyes, count);

      for (var i = 0; i < count; i++) {
        wizardList[i] = {
          name: fullNames[i],
          coatColor: coats[i],
          eyesColor: eyes[i]
        };
      }
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
      return wizardList;
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
