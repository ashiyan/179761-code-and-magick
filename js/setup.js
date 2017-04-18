/* Работает с окном настроек мага */

/* global data, similarWizards */

'use strict';

window.setup = (function () {

  var element = {
    shop: document.querySelector('.setup-artifacts-shop'),
    inventory: document.querySelector('.setup-artifacts'),
    coat: document.querySelector('.wizard-coat'),
    eyes: document.querySelector('.wizard-eyes'),
    fireball: document.querySelector('.setup-fireball-wrap')
  };

  var artifact = null;

  /* ---------------------------------------------------------------------------
   * Обработчик события начала перетаскивания
   * @param {Object} - объект события
   */
  function dragStartHandler(event) {
    artifact = event.target.closest('.setup-artifacts-shop') ? event.target.cloneNode(true) : event.target;

    if (event.target.tagName.toLowerCase() === 'img') {
      event.dataTransfer.setData('text/plain', event.target.alt);
      element.inventory.style.outline = '2px dashed red';
    }
  }

  /* ---------------------------------------------------------------------------
   * Отменяет действие события dragover, предусмотренное браузером по умолчанию
   * @param {Object} - объект события
   */
  function dragOverHandler(event) {
    event.preventDefault();
    return false;
  }

  /* ---------------------------------------------------------------------------
   * Обработчик нахождения указателя мыши над зоной дропа
   * @param {Object} - объект события
   */
  function dragEnterHandler(event) {
    event.preventDefault();
    if (event.target.nodeName.toLowerCase() === 'img' || event.target.hasChildNodes()) {
      event.target.style.backgroundColor = 'red';
    } else {
      event.target.style.backgroundColor = 'yellow';
      element.inventory.addEventListener('drop', dragDropHandler);
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик выхода указателя мыши из зоны дропа
   * @param {Object} - объект события
   */
  function dragLeaveHandler(event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  }

  /* ---------------------------------------------------------------------------
   * Обработчик момента дропа
   * @param {Object} - объект события
   */
  function dragDropHandler(event) {
    event.target.style.backgroundColor = '';
    if (event.target.nodeName.toLowerCase() === 'div' && !event.target.hasChildNodes()) {
      event.target.appendChild(artifact);
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события окончания перетаскивания
   * @param {Object} - объект события
   */
  function dragEndHandler(event) {
    element.inventory.style.outline = 'none';
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета мантии
   * @param {Object} - объект события
   */
  function changeCoatHandler(event) {
    var existColor = element.coat.style.fill;
    var newColor = data.getUniqueColor('coat', existColor);
    element.coat.style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета глаз
   * @param {Object} - объект события
   */
  function changeEyesHandler(event) {
    var existColor = element.eyes.style.fill;
    var newColor = data.getUniqueColor('eyes', existColor);
    element.eyes.style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета фаербола
   * @param {Object} - объект события
   */
  function changeFireballHandler(event) {
    var existColor = element.fireball.style.background;
    var newColor = data.getUniqueColor('fireball', existColor);
    element.fireball.style.background = newColor;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    init: function() {
      /* Отрисовка похожих магов */
      similarWizards.draw();

      /* Подписка элементов на события drag-and-drop */
      element.shop.addEventListener('dragstart', dragStartHandler);
      element.shop.addEventListener('dragend', dragEndHandler);
      element.inventory.addEventListener('dragstart', dragStartHandler);
      element.inventory.addEventListener('dragover', dragOverHandler);
      element.inventory.addEventListener('dragenter', dragEnterHandler);
      element.inventory.addEventListener('dragleave', dragLeaveHandler);
      element.inventory.addEventListener('dragend', dragEndHandler);

      /* Подписка элементов на события изменения цвета */
      element.coat.addEventListener('click', changeCoatHandler);
      element.eyes.addEventListener('click', changeEyesHandler);
      element.fireball.addEventListener('click', changeFireballHandler);
    }

  };

})();
