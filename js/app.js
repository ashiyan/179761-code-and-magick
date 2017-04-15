/* Инициализирует другие модули */

/* global app, data, subscribes, setup */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует модули приложения
     */
    init: function () {
      data.init(4);
      subscribes.init();
      var wizards = data.getWizardList();
      setup.drawSimilarWizards(wizards);
    }
  };

})();

/* Запуск инициализации */
app.init();
