'use strict';

(function () {


  /* ---------------------------------------------------------------------------
   * Возвращает случайное значение из массива, при этом удаляя его из источника
   *
   * @param {Array.<string>} - массив для обработки
   * @return {string}
   */
  function randomVariable(array) {
    var index = Math.floor(Math.random() * array.length);
    var variable = array[index];
    array.splice(index, 1);
    return variable;
  }


  /* ---------------------------------------------------------------------------
   * Возвращает массив случайно сгенерированных строк вида "Имя Фамилия"
   *
   * @param {number} - количество персонажей
   * @return {string}
   */
  function getRandomNames(count) {
    var randomNames = [];
    var firstNames = [
      'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
      'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
    ];
    var lastNames = [
      'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
      'Топольницкая', 'Нионго', 'Ирвинг'
    ];

    for (var i = 0; i < count; i++) {
      var randomFirstName = randomVariable(firstNames);
      var randomLastName = randomVariable(lastNames);
      randomNames[i] = randomFirstName + ' ' + randomLastName;
    }

    return randomNames;
  }


  /* ---------------------------------------------------------------------------
   * Возвращает массив случайно сгенерированных строк с цветами плащей
   *
   * @param {number} - количество персонажей
   * @return {string}
   */
  function getRandomCoatColors(count) {
    var randomCoatColors = [];
    var coatColors = [
      'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
      'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
    ];

    for (var i = 0; i < count; i++) {
      randomCoatColors[i] = randomVariable(coatColors);
    }

    return randomCoatColors;
  }


  /* ---------------------------------------------------------------------------
   * Возвращает массив случайно сгенерированных строк с цветами глаз
   *
   * @param {number} - количество персонажей
   * @return {string}
   */
  function getRandomEyeColors(count) {
    var randomEyeColors = [];
    var eyeColors = [
      'black', 'red', 'blue', 'yellow', 'green'
    ];

    for (var i = 0; i < count; i++) {
      randomEyeColors[i] = randomVariable(eyeColors);
    }

    return randomEyeColors;
  }


  /* ---------------------------------------------------------------------------
   * Создает узел из данных конкретного персонажа и возвращает его
   *
   * @param {HTMLTemplateElement.content} - шаблон для создания узла
   * @param {Object} - данные персонажа для вставки в узел
   * @return {DocumentFragment}
   */
  function createCharacterNode(template, characterObject) {
    var characterNode = template.cloneNode(true);

    characterNode.querySelector('.setup-similar-label').textContent =
      characterObject.name;
    characterNode.querySelector('.wizard-coat').style.fill =
      characterObject.coatColor;
    characterNode.querySelector('.wizard-eyes').style.fill =
      characterObject.eyesColor;

    return characterNode;
  }


  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент с данными всех персонажей
   *
   * @param {Array<Object>} - массив с объектами персонажей
   * @return {DocumentFragment}
   */
  function createCharactersFragment(characters) {
    var template = document.querySelector('#similar-wizard-template').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < characters.length; i++) {
      var characterNode = createCharacterNode(template, characters[i]);
      fragment.appendChild(characterNode);
    }

    return fragment;
  }


  /* ---------------------------------------------------------------------------
   * Создает и возвращает массив с объектами персонажей
   *
   * @param {number} - количество персонажей
   * @return {Array<Object>}
   */
  function createSetOfCharacters(count) {
    var characters = [];
    var names = getRandomNames(count);
    var coatColors = getRandomCoatColors(count);
    var eyeColors = getRandomEyeColors(count);

    for (var i = 0; i < count; i++) {
      characters[i] = {
        name: names[i],
        coatColor: coatColors[i],
        eyesColor: eyeColors[i]
      };
    }

    return characters;
  }


  /* ---------------------------------------------------------------------------
   * Отображает блоки .setup и .setup-similar
   */
  function showSetupBlocks() {
    document.querySelector('.setup').classList.remove('hidden');
    document.querySelector('.setup-similar').classList.remove('hidden');
  }


  /* ---------------------------------------------------------------------------
   * Вставляет фрагмент в указанную разметку
   *
   * @param {DocumentFragment} - фрагмент для вставки в разметку
   * @param {HTMLElement} - блок разметки HTML
   */
  function pasteFragment(fragment, block) {
    document.querySelector(block).appendChild(fragment);
  }


  /* ---------------------------------------------------------------------------
   * Создает набор из необходимого количества персонажей,
   * преобразовывает его в фрагмент и вставляет в разметку
   *
   * @param {number} - количество персонажей
   */
  function drawSimilarCharacters(count) {
    var setOfCharacters = createSetOfCharacters(count);
    var charactersFragment = createCharactersFragment(setOfCharacters);
    showSetupBlocks();
    pasteFragment(charactersFragment, '.setup-similar-list');
  }


  drawSimilarCharacters(4);

})();
