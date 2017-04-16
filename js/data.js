/* Генерирует и возвращает объекты магов и другие данные */

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
   * Возвращает случайное значение из массива
   * @param {Array.<string>} - массив для обработки
   * @param {boolean} - способ получения значения (true - удаление из источника)
   * @return {string}
   */
  function randomGet(array, isPop) {
    var index = Math.floor(Math.random() * array.length);
    var variable = array[index];
    if (isPop) {
      array.splice(index, 1);
    }
    return variable;
  }

  /* ---------------------------------------------------------------------------
   * Возвращает массив случайно выбранных значений
   * @param {Array.<string>} - начальный массив значений
   * @param {number} - количество
   * @return {Array.<string>}
   */
  function getData(array, count) {
    var result = [];
    var info = array.slice();

    for (var i = 0; i < count; i++) {
      result[i] = randomGet(info, true);
    }

    return result;
  }

  /* ---------------------------------------------------------------------------
   * Генерирует и возвращает массив полных имен
   * @param {Array.<string>} - массив имен
   * @param {Array.<string>} - массив фамилий
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
     * Создает массив с объектами магов
     * @param {number} - количество
     * @return {Array<Object>}
     */
    init: function (count) {
      var firstNames = getData(information.name.first, count);
      var lastNames = getData(information.name.last, count);
      var fullNames = makeFullNames(firstNames, lastNames);
      var coats = getData(information.color.coat, count);
      var eyes = getData(information.color.eyes, count);

      for (var i = 0; i < count; i++) {
        wizardList[i] = {
          name: fullNames[i],
          coatColor: coats[i],
          eyesColor: eyes[i]
        };
      }
    },

    /* -------------------------------------------------------------------------
     * Возвращает случайный цвет
     * @param {string} - тип объекта для покраски
     * @param {string} - цвет для сравнения
     * @return {string}
     */
    getUniqueColor: function (subject, oldColor) {
      var palette = information.color[subject];
      var newColor;
      var isNotUnique = true;

      while (isNotUnique) {
        newColor = randomGet(palette, false);
        if (newColor !== oldColor) {
          isNotUnique = false;
        }
      }

      return newColor;
    },

    /* -------------------------------------------------------------------------
     * Возвращает объект мага по индексу
     * @param {number} - индекс обьявления
     */
    getWizard: function (index) {
      return wizardList[index];
    },

    /* -------------------------------------------------------------------------
     * Возвращает массив с объектами магов
     */
    getWizardList: function () {
      return wizardList;
    }

  };

})();
