/* Allows to drag the dialog window clicking on the avatar */

'use strict';

window.dialogBehavior = (function () {

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
   * Sets the logic for closing window
   * @param {Object} - event object
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
   * Reset the default dialog window position after reopening
   */
  function resetDialogPosition() {
    if (coords.hasOwnProperty('reset')) {
      element.dialog.style.left = coords.reset.x + 'px';
      element.dialog.style.top = coords.reset.y + 'px';
    }
  }

  /* ---------------------------------------------------------------------------
   * Dialog window opening event handler
   * @param {Object} - event object
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
   * Dialog window closing event handler
   * @param {Object} - event object
   */
  function setupCloseHandler(event) {
    if (isSetupCanClose(event)) {
      element.dialog.classList.add('hidden');
      resetDialogPosition();
    }
  }

  /* ---------------------------------------------------------------------------
   * Start the drag and drop process (clicking on the object)
   * @param {Object} - event object
   */
  function startDrag(event) {
    /* Cancel event if the middle or right mouse button is pressed */
    var pressed = {
      mouseMiddle: event.button === 1,
      mouseRight: event.button === 2
    };
    if (pressed.mouseMiddle || pressed.mouseRight) {
      return;
    }

    /* Remember position before start dragging */
    coords.start = {
      x: element.dialog.offsetLeft,
      y: element.dialog.offsetTop
    };

    /* Remember first position for reset */
    if (!coords.hasOwnProperty('reset')) {
      coords.reset = {
        x: coords.start.x,
        y: coords.start.y
      };
    }

    /* Remember coordinates of mouse cursor at the click moment */
    coords.mouse = {
      x: event.clientX,
      y: event.clientY
    };

    element.dialog.addEventListener('dragstart', dragOver);
    element.dialog.addEventListener('mousemove', processDrag);
    element.dialog.addEventListener('mouseup', endDrag);
  }

  /* ---------------------------------------------------------------------------
   * Canceled browser's default dragover action
   * @param {Object} - event object
   */
  function dragOver(event) {
    event.preventDefault();
    return false;
  }

  /* ---------------------------------------------------------------------------
   * Dragging process (moving mouse with button pressed)
   * @param {Object} - event object
   */
  function processDrag(event) {
    /* Coordinates in the drag process */
    var newCoords = {
      x: coords.start.x + event.clientX - coords.mouse.x,
      y: coords.start.y + event.clientY - coords.mouse.y
    };

    /* Apply coordinates */
    element.dialog.style.left = newCoords.x + 'px';
    element.dialog.style.top = newCoords.y + 'px';
  }

  /* ---------------------------------------------------------------------------
   * End of the drag and drop process (release mouse button)
   * @param {Object} - event object
   */
  function endDrag(event) {
    element.dialog.removeEventListener('mousemove', processDrag);
    element.dialog.removeEventListener('dragstart', dragOver);
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes opening / closing and dragging abilities
     */
    init: function () {
      document.body.addEventListener('keydown', setupCloseHandler);
      element.avatarBody.addEventListener('click', setupOpenHandler);
      element.avatarBody.addEventListener('keydown', setupOpenHandler);
      element.setupCross.addEventListener('click', setupCloseHandler);
      element.setupCross.addEventListener('keydown', setupCloseHandler);
      element.avatarDialog.addEventListener('mousedown', startDrag);
    },
  };

})();
