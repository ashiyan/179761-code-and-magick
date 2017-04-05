'use strict';

(function () {


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                        ГЕНЕРАЦИЯ ПОХОЖИХ ПЕРСОНАЖЕЙ
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


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
    // document.querySelector('.setup').classList.remove('hidden');
    // document.querySelector('.setup-similar').classList.remove('hidden');
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


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                      ОТКРЫТИЕ / ЗАКРЫТИЕ ОКНА НАСТРОЕК
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


  /* ---------------------------------------------------------------------------
   * Устанавливает логику обработки события открытия окна
   *
   * @param {Object} - объект события
   * @return {boolean}
   */
  function setupCanOpen(event) {
    return event.button === 0 || event.keyCode === 13;
  }


  /* ---------------------------------------------------------------------------
   * Устанавливает логику обработки события закрытия окна
   *
   * @param {Object} - объект события
   * @return {boolean}
   */
  function setupCanClose(event) {
    var crossOrButton =
      event.currentTarget.classList.contains('setup-close') ||
      event.currentTarget.classList.contains('setup-submit');

    var isInputInactive =
      document.querySelector('.setup-user-name') !== document.activeElement;

    if (crossOrButton) {
      return event.button === 0 || event.keyCode === 13;
    } else if (isInputInactive) {
      return event.keyCode === 27;
    }

    return false;
  }


  /* ---------------------------------------------------------------------------
   * Возвращает случайный цвет из определенного набора
   *
   * @param {string} - название набора
   * @return {string}
   */
  function getNextColor(type) {
    var colors = {
      coat: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
        'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
      eyes: ['black', 'red', 'blue', 'yellow', 'green'],
      fireball: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
    };

    var index = Math.floor(Math.random() * colors[type].length);

    return colors[type][index];
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события открытия окна
   *
   * @param {Object} - объект события
   */
  function setupOpenHandler(event) {
    if (setupCanOpen(event)) {
      document.querySelector('.setup').classList.remove('hidden');
    }
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события закрытия окна
   *
   * @param {Object} - объект события
   */
  function setupCloseHandler(event) {
    if (setupCanClose(event)) {
      document.querySelector('.setup').classList.add('hidden');
    }
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета мантии
   *
   * @param {Object} - объект события
   */
  function changeCoatHandler(event) {
    var newColor = getNextColor('coat');
    document.querySelector('.wizard-coat').style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета глаз
   *
   * @param {Object} - объект события
   */
  function changeEyesHandler(event) {
    var newColor = getNextColor('eyes');
    document.querySelector('.wizard-eyes').style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета фаербола
   *
   * @param {Object} - объект события
   */
  function changeFireballHandler(event) {
    var newColor = getNextColor('fireball');
    document.querySelector('.setup-fireball-wrap').style.background = newColor;
  }


  // Подписка на открытие окна настроек
  document.querySelector('.setup-open').addEventListener('click', setupOpenHandler);
  document.querySelector('.setup-open').addEventListener('keydown', setupOpenHandler);

  // Подписка на закрытие окна настроек
  document.querySelector('.setup-close').addEventListener('click', setupCloseHandler);
  document.querySelector('.setup-close').addEventListener('keydown', setupCloseHandler);
  document.querySelector('.setup-submit').addEventListener('click', setupCloseHandler);
  document.querySelector('.setup-submit').addEventListener('keydown', setupCloseHandler);
  document.body.addEventListener('keydown', setupCloseHandler);

  // Подписка на изменение цвета
  document.querySelector('.wizard-coat').addEventListener('click', changeCoatHandler);
  document.querySelector('.wizard-eyes').addEventListener('click', changeEyesHandler);
  document.querySelector('.setup-fireball-wrap').addEventListener('click', changeFireballHandler);

})();
