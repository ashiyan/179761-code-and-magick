/* Инициализирует другие модули */

/* global app, data, dialog, setup */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Инициализирует модули приложения
     */
    init: function () {
      data.init(4);
      dialog.init();
      setup.init();
    }
  };

})();

/* Запуск инициализации */
app.init();
