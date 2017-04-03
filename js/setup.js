'use strict';

(function () {

  // ----- ПЕРЕМЕННЫЕ


  var characters = [];      // объекты персонажей
  var charactersCount = 4;  // количество персонажей
  var firstNames = [        // набор имен
    'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ];
  var lastNames = [         // набор фамилий
    'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
    'Топольницкая', 'Нионго', 'Ирвинг'
  ];
  var coatColors = [        // набор цветов плаща
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  var eyeColors = [         // набор цветов глаз
    'black', 'red', 'blue', 'yellow', 'green'
  ];


  // ----- ФУНКЦИИ

  /*
   * Возвращает случайное значение из массива, при этом удаляя его из источника
   *
   * @param {Array.<string>} - массив для обработки
   * @return {string} - случайное значение из массива
   */
  function randomVariable(array) {
    var index = Math.floor(Math.random() * array.length);
    var variable = array[index];
    array.splice(index, 1);
    return variable;
  }

  /*
   * Генерирует случайные имя и фамилию
   *
   * @return {string} - строка вида 'Имя Фамилия'
   */
  function getRandomName() {
    var randomFirstName = randomVariable(firstNames);
    var randomLastName = randomVariable(lastNames);

    return randomFirstName + ' ' + randomLastName;
  }

  /*
   * Возвращает случайный цвет плаща
   *
   * @return {string} - строка с цветом
   */
  function getRandomCoatColor() {
    return randomVariable(coatColors);
  }

  /*
   * Возвращает случайный цвет глаз
   *
   * @return {string} - строка с цветом
   */
  function getRandomEyeColor() {
    return randomVariable(eyeColors);
  }

  /*
   * Создает узел, состоящий из данных конкретного персонажа и возвращает его для дальнейшей обработки
   *
   * @param {HTMLTemplateElement.content} - шаблон, на основании которого создается узел
   * @param {Object} - данные персонажа для вставки в узел
   *
   * @return {DocumentFragment} - узел с данными персонажа для дальнейшего объединения в фрагменте
   */
  function createCharacterNode(template, characterObject) {
    var characterNode = template.cloneNode(true);
    characterNode.querySelector('.setup-similar-label').textContent = characterObject.name;
    characterNode.querySelector('.wizard-coat').style.fill = characterObject.coatColor;
    characterNode.querySelector('.wizard-eyes').style.fill = characterObject.eyesColor;
    return characterNode;
  }

  /*
   * Создает и возвращает DOM-фрагмент,
   * объединяющий узлы с данными всех созданных персонажей
   *
   * @return {DocumentFragment} - фрагмент с данными персонажей для вставки в HTML
   */
  function createCharactersFragment() {
    var template = document.querySelector('#similar-wizard-template').content;
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < charactersCount; j++) {
      var characterNode = createCharacterNode(template, characters[j]);
      fragment.appendChild(characterNode);
    }

    return fragment;
  }

  /*
   * Создает и возвращает объект персонажа
   *
   * @return {Object} - объект с заданными полями и сгенерированными для них значениями
   */
  function createCharacterObject() {
    var newCharacterObject = {
      name: getRandomName(),
      coatColor: getRandomCoatColor(),
      eyesColor: getRandomEyeColor()
    };

    return newCharacterObject;
  }


  // ----- ОСНОВНОЙ КОД


  // Отображение блоков .setup и .setup-similar
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');

  // Создание массива с объектами персонажей
  for (var i = 0; i < charactersCount; i++) {
    characters[i] = createCharacterObject();
  }

  // Вставка фрагмента с данными персонажей в разметку
  var similarCharacters = document.querySelector('.setup-similar-list');
  similarCharacters.appendChild(createCharactersFragment());

})();
