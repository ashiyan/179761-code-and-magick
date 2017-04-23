/* Generates fragments of similar wizards and draws them */

'use strict';

window.similarWizards = (function () {

  /* ---------------------------------------------------------------------------
   * Creates and returns a node with wizard's data
   * @param {Object} - wizard's object
   * @return {HTMLElement}
   */
  function createNode(wizard) {
    var template = document.querySelector('#similar-wizard-template').content;
    var node = template.cloneNode(true);

    node.querySelector('.setup-similar-label').textContent = wizard.name;
    node.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    node.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return node;
  }

  /* ---------------------------------------------------------------------------
   * Creates and returns a DOM fragment containing nodes with wizards data
   * @param {Array<Object>} - array with wizards objects
   * @return {Document.Fragment}
   */
  function getWizardsFragment(wizardsList) {
    var fragment = document.createDocumentFragment();

    wizardsList.forEach(function (wizard) {
      var node = createNode(wizard);
      fragment.appendChild(node);
    });

    return fragment;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Draws wizards in the "Similar characters" section of the settings window
     */
    draw: function () {
      var similarList = document.querySelector('.setup-similar-list');
      var wizardList = window.data.getWizardList();
      var wizardsFragment = getWizardsFragment(wizardList);
      similarList.appendChild(wizardsFragment);
    }

  };

})();
