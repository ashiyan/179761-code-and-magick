/* Работает с окном настроек мага */

/* global data, wizards */

'use strict';

window.setup = (function () {

  var element = {
    sectionSimilarList: document.querySelector('.setup-similar-list')
  };

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Отрисовывает магов в разделе "Похожие персонажи" окна настроек
     */
    drawSimilarWizards: function () {
      var wizardList = data.getWizardList();
      var wizardsFragment = wizards.getWizardsFragment(wizardList);
      element.sectionSimilarList.appendChild(wizardsFragment);
    }

  };

})();
