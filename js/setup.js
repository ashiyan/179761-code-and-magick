'use strict';


// ----- ПЕРЕМЕННЫЕ


var characters = [];      // объекты персонажей
var charactersCount = 4;  // количество персонажей


// ----- ФУНКЦИИ


/*
 * Генерирует случайные имя и фамилию
 *
 * @return {string} - строка вида 'Имя Фамилия'
 */
var getRandomName = function () {
  var firstNames = [
    'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ];
  var lastNames = [
    'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
    'Топольницкая', 'Нионго', 'Ирвинг'
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' +
    lastNames[Math.floor(Math.random() * lastNames.length)];
};

/*
 * Возвращает случайный цвет плаща
 *
 * @return {string} - строка с цветом
 */
var getRandomCoatColor = function () {
  var coatColors = [
    'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
  ];
  return coatColors[Math.floor(Math.random() * coatColors.length)];
};

/*
 * Возвращает случайный цвет глаз
 *
 * @return {string} - строка с цветом
 */
var getRandomEyeColor = function () {
  var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
  return eyeColors[Math.floor(Math.random() * eyeColors.length)];
};

/*
 * Создает узел, состоящий из данных конкретного персонажа и возвращает его для дальнейшей обработки
 *
 * @param {HTMLTemplateElement.content} - шаблон, на основании которого создается узел
 * @param {Object} - данные персонажа для вставки в узел
 *
 * @return {DocumentFragment} - узел с данными персонажа для дальнейшего объединения в фрагменте
 */
var createCharacterNode = function (template, characterObject) {
  var characterNode = template.cloneNode(true);
  characterNode.querySelector('.setup-similar-label').textContent = characterObject.name;
  characterNode.querySelector('.wizard-coat').style.fill = characterObject.coatColor;
  characterNode.querySelector('.wizard-eyes').style.fill = characterObject.eyesColor;
  return characterNode;
};

/*
 * Создает и возвращает DOM-фрагмент,
 * объединяющий узлы с данными всех созданных персонажей
 *
 * @return {DocumentFragment} - фрагмент с данными персонажей для вставки в HTML
 */
var createCharactersFragment = function () {
  var template = document.querySelector('#similar-wizard-template').content;
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < charactersCount; j++) {
    var characterNode = createCharacterNode(template, characters[j]);
    fragment.appendChild(characterNode);
  }

  return fragment;
};


// ----- ОСНОВНОЙ КОД


// Отображение блоков .setup и .setup-similar
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// Создание массива с объектами персонажей
for (var i = 0; i < charactersCount; i++) {
  characters[i] = {
    name: getRandomName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyeColor()
  };
}

// Вставка фрагмента с данными персонажей в разметку
var similarCharacters = document.querySelector('.setup-similar-list');
similarCharacters.appendChild(createCharactersFragment());
