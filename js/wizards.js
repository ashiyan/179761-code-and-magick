/* Создает фрагмент с данными магов для отрисовки */

'use strict';

window.wizards = (function () {

  /* ---------------------------------------------------------------------------
   * Создает и возвращает узел с данными мага
   * @param {Object} - объект мага
   * @return {HTMLElement}
   */
  function createNode(wizard) {
    var template = document.querySelector('#similar-wizard-template').content;
    var node = template.cloneNode(true);

    node.querySelector('.setup-similar-label').textContent = wizard.name;
    node.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    node.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return node;
  }

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Создает и возвращает DOM-фрагмент, состоящий из узлов с данными магов
     * @param {Array<Object>} - массив с объектами магов
     * @return {Document.Fragment}
     */
    getWizardsFragment: function (wizardsList) {
      var fragment = document.createDocumentFragment();

      wizardsList.forEach(function (wizard) {
        var node = createNode(wizard);
        fragment.appendChild(node);
      });

      return fragment;
    }

  };

})();
