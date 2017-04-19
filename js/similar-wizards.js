/* Создает фрагмент с данными магов для отрисовки */

/* global data */

'use strict';

window.similarWizards = (function () {

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

  /* ---------------------------------------------------------------------------
   * Создает и возвращает DOM-фрагмент, состоящий из узлов с данными магов
   * @param {Array<Object>} - массив с объектами магов
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
     * Отрисовывает магов в разделе "Похожие персонажи" окна настроек
     */
    draw: function () {
      var similarList = document.querySelector('.setup-similar-list');
      var wizardList = data.getWizardList();
      var wizardsFragment = getWizardsFragment(wizardList);
      similarList.appendChild(wizardsFragment);
    }

  };

})();
