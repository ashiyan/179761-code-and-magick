/* Позволяет перетаскивать окно диалога при нажатии на аватар */

'use strict';

window.dialog = (function () {

  var element = {
    avatarBody: document.querySelector('.setup-open'),
    avatarDialog: document.querySelector('.setup-user-pic'),
    dialog: document.querySelector('.setup'),
    setupCross: document.querySelector('.setup-close'),
    setupSimilar: document.querySelector('.setup-similar'),
    usernameField: document.querySelector('.setup-user-name')
  };

  var coords = {};

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

    var isInputInactive = element.usernameField !== document.activeElement;

    if (pressedElement.cross || pressedElement.submit) {
      return pressedButton.mouseLeft || pressedButton.enter;
    } else if (isInputInactive) {
      return pressedButton.escape;
    }

    return false;
  }

  /* ---------------------------------------------------------------------------
   * Восстанавливает исходную позицию окна после его закрытия
   */
  function resetDialogPosition() {
    if (coords.hasOwnProperty('reset')) {
      element.dialog.style.left = coords.reset.x + 'px';
      element.dialog.style.top = coords.reset.y + 'px';
    }
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
      element.dialog.classList.remove('hidden');
      element.setupSimilar.classList.remove('hidden');
    }
  }

  /* ---------------------------------------------------------------------------
   * Обработчик события закрытия окна
   * @param {Object} - объект события
   */
  function setupCloseHandler(event) {
    if (isSetupCanClose(event)) {
      element.dialog.classList.add('hidden');
      resetDialogPosition();
    }
  }

  /* ---------------------------------------------------------------------------
   * Начало процесса перетаскивания (клик по объекту)
   * @param {Object} - объект события
   */
  function startDrag(event) {
    /* Отмена события при нажатии средней или правой кнопки мыши */
    var pressed = {
      mouseMiddle: event.button === 1,
      mouseRight: event.button === 2
    };
    if (pressed.mouseMiddle || pressed.mouseRight) {
      return;
    }

    /* Запомнить позицию перед началом перетаскивания */
    coords.start = {
      x: element.dialog.offsetLeft,
      y: element.dialog.offsetTop
    };

    /* Запомнить самую первую позицию для восстановления */
    if (!coords.hasOwnProperty('reset')) {
      coords.reset = {
        x: coords.start.x,
        y: coords.start.y
      };
    }

    /* Запомнить координаты курсора мышки в момент клика */
    coords.mouse = {
      x: event.clientX,
      y: event.clientY
    };

    element.dialog.addEventListener('dragstart', dragOver);
    element.dialog.addEventListener('mousemove', processDrag);
    element.dialog.addEventListener('mouseup', endDrag);
  }

  /* ---------------------------------------------------------------------------
   * Отменяет действие события dragover, предусмотренное браузером по умолчанию
   * @param {Object} - объект события
   */
  function dragOver(event) {
    event.preventDefault();
    return false;
  }

  /* ---------------------------------------------------------------------------
   * Процесс перетаскивания (движение мыши с зажатой кнопкой)
   * @param {Object} - объект события
   */
  function processDrag(event) {
    /* Координаты в процессе драга с корректировкой на курсор */
    var newCoords = {
      x: coords.start.x + event.clientX - coords.mouse.x,
      y: coords.start.y + event.clientY - coords.mouse.y
    };

    /* Применить координаты */
    element.dialog.style.left = newCoords.x + 'px';
    element.dialog.style.top = newCoords.y + 'px';
  }

  /* ---------------------------------------------------------------------------
   * Окончание процесса перетаскивания (отпускание кнопки мыши)
   * @param {Object} - объект события
   */
  function endDrag(event) {
    element.dialog.removeEventListener('mousemove', processDrag);
    element.dialog.removeEventListener('dragstart', dragOver);
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует открытие/закрытие и возможность перетаскивания
     */
    init: function() {
      document.body.addEventListener('keydown', setupCloseHandler);
      element.avatarBody.addEventListener('click', setupOpenHandler);
      element.avatarBody.addEventListener('keydown', setupOpenHandler);
      element.setupCross.addEventListener('click', setupCloseHandler);
      element.setupCross.addEventListener('keydown', setupCloseHandler);
      element.avatarDialog.addEventListener('mousedown', startDrag);
    },
  };

})();