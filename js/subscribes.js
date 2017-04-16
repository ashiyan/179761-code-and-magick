/* Подписывает элементы на события */

/* global data */

'use strict';

window.subscribes = (function () {

  var element = {
    window: {
      body: document.body,
      avatar: document.querySelector('.setup-open'),
      setup: document.querySelector('.setup'),
      setupCross: document.querySelector('.setup-close'),
      setupSimilar: document.querySelector('.setup-similar'),
      usernameField: document.querySelector('.setup-user-name')
    },
    wizard: {
      coat: document.querySelector('.wizard-coat'),
      eyes: document.querySelector('.wizard-eyes'),
      fireball: document.querySelector('.setup-fireball-wrap')
    }
  };

  /* ---------------------------------------------------------------------------
   * Устанавливает логику обработки события закрытия окна
   * @param {Object} - объект события
   * @return {boolean}
   */
  function isSetupCanClose(event) {
    var pressedButton = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13,
      escape: event.keyCode === 27
    };
    var pressedElement = {
      cross: event.currentTarget.classList.contains('setup-close'),
      submit: event.currentTarget.classList.contains('setup-submit')
    };

    var isInputInactive = element.window.usernameField !== document.activeElement;

    if (pressedElement.cross || pressedElement.submit) {
      return pressedButton.mouseLeft || pressedButton.enter;
    } else if (isInputInactive) {
      return pressedButton.escape;
    }

    return false;
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события открытия окна
   * @param {Object} - объект события
   */
  function setupOpenHandler(event) {
    var pressedButton = {
      mouseLeft: event.button === 0,
      enter: event.keyCode === 13,
    };

    if (pressedButton.mouseLeft || pressedButton.enter) {
      element.window.setup.classList.remove('hidden');
      element.window.setupSimilar.classList.remove('hidden');
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события закрытия окна
   * @param {Object} - объект события
   */
  function setupCloseHandler(event) {
    if (isSetupCanClose(event)) {
      element.window.setup.classList.add('hidden');
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета мантии
   * @param {Object} - объект события
   */
  function changeCoatHandler(event) {
    var existColor = element.wizard.coat.style.fill;
    var newColor = data.getUniqueColor('coat', existColor);
    element.wizard.coat.style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета глаз
   * @param {Object} - объект события
   */
  function changeEyesHandler(event) {
    var existColor = element.wizard.eyes.style.fill;
    var newColor = data.getUniqueColor('eyes', existColor);
    element.wizard.eyes.style.fill = newColor;
  }


  /* ---------------------------------------------------------------------------
   * Обработчик события изменения цвета фаербола
   * @param {Object} - объект события
   */
  function changeFireballHandler(event) {
    var existColor = element.wizard.fireball.style.background;
    var newColor = data.getUniqueColor('fireball', existColor);
    element.wizard.fireball.style.background = newColor;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует подписки на события
     */
    init: function () {
      element.window.avatar.addEventListener('click', setupOpenHandler);
      element.window.avatar.addEventListener('keydown', setupOpenHandler);
      element.window.body.addEventListener('keydown', setupCloseHandler);
      element.window.setupCross.addEventListener('click', setupCloseHandler);
      element.window.setupCross.addEventListener('keydown', setupCloseHandler);
      element.wizard.coat.addEventListener('click', changeCoatHandler);
      element.wizard.eyes.addEventListener('click', changeEyesHandler);
      element.wizard.fireball.addEventListener('click', changeFireballHandler);
    }

  };

})();
