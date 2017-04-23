/* Works with the wizard's settings window */

'use strict';

window.setup = (function () {

  var element = {
    shop: document.querySelector('.setup-artifacts-shop'),
    inventory: document.querySelector('.setup-artifacts'),
    artifact: null,
    coat: document.querySelector('.wizard-coat'),
    eyes: document.querySelector('.wizard-eyes'),
    fireball: document.querySelector('.setup-fireball')
  };

  /* ---------------------------------------------------------------------------
   * Handler of the drag start event
   * @param {Object} - event object
   */
  function artifactDragStartHandler(event) {
    element.artifact = event.target.closest('.setup-artifacts-shop') ?
      event.target.cloneNode(true) : event.target;

    if (event.target.tagName.toLowerCase() === 'img') {
      event.dataTransfer.setData('text/plain', event.target.alt);
      element.inventory.style.outline = '2px dashed red';
    }
  }

  /* ---------------------------------------------------------------------------
   * Canceled browser's default dragover action
   * @param {Object} - event object
   */
  function artifactDragOverHandler(event) {
    event.preventDefault();
    return false;
  }

  /* ---------------------------------------------------------------------------
   * Handler of the mouse pointer over the drop zone
   * @param {Object} - event object
   */
  function artifactDragEnterHandler(event) {
    event.preventDefault();
    if (event.target.nodeName.toLowerCase() === 'img' || event.target.hasChildNodes()) {
      event.target.style.backgroundColor = 'red';
    } else {
      event.target.style.backgroundColor = 'yellow';
      element.inventory.addEventListener('drop', artifactDragDropHandler);
    }
  }

  /* ---------------------------------------------------------------------------
   * Handler of the mouse pointer output from the drop zone
   * @param {Object} - event object
   */
  function artifactDragLeaveHandler(event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  }

  /* ---------------------------------------------------------------------------
   * Handler of the drop moment
   * @param {Object} - event object
   */
  function artifactDragDropHandler(event) {
    event.target.style.backgroundColor = '';
    if (event.target.nodeName.toLowerCase() === 'div' && !event.target.hasChildNodes()) {
      event.target.appendChild(element.artifact);
    }
  }

  /* ---------------------------------------------------------------------------
   * Handler of the drag end
   * @param {Object} - event object
   */
  function artifactDragEndHandler(event) {
    element.inventory.style.outline = 'none';
  }

  /* ---------------------------------------------------------------------------
   * Handler of the changing wizard's parts color
   * @param {Object} - event object
   */
  function changeWizardColorHandler(event) {

    /* ---------------------------------------------------------------------------
     * Fills SVG-figures
     * @param {HTMLElement} - element for coloring
     * @param {string} - color
     */
    function fillElement(elem, color) {
      elem.style.fill = color;
    }

    /* ---------------------------------------------------------------------------
     * Changes element's background color
     * @param {HTMLElement} - element for coloring
     * @param {string} - color
     */
    function changeElementBackground(elem, color) {
      elem.style.background = color;
    }

    switch (event.target) {
      case element.coat:
        window.colorizeElement(element.coat, window.data.getColor('coat'), fillElement);
        break;
      case element.eyes:
        window.colorizeElement(element.eyes, window.data.getColor('eyes'), fillElement);
        break;
      case element.fireball:
        var fireballElement = document.querySelector('.setup-fireball-wrap');
        window.colorizeElement(fireballElement, window.data.getColor('fireball'), changeElementBackground);
        break;
    }

  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* ---------------------------------------------------------------------------
     * Initializes events subscriptions and draws similar wizards
     */
    init: function () {
      /* Subscribing elements to drag-and-drop events */
      element.shop.addEventListener('dragstart', artifactDragStartHandler);
      element.shop.addEventListener('dragend', artifactDragEndHandler);
      element.inventory.addEventListener('dragstart', artifactDragStartHandler);
      element.inventory.addEventListener('dragover', artifactDragOverHandler);
      element.inventory.addEventListener('dragenter', artifactDragEnterHandler);
      element.inventory.addEventListener('dragleave', artifactDragLeaveHandler);
      element.inventory.addEventListener('dragend', artifactDragEndHandler);

      /* Subscribing elements to color change events */
      element.coat.addEventListener('click', changeWizardColorHandler);
      element.eyes.addEventListener('click', changeWizardColorHandler);
      element.fireball.addEventListener('click', changeWizardColorHandler);
    }

  };

})();
