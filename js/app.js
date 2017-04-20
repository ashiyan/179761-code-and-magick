/* Initializes other modules */

/* global app, data, dialogBehavior, setup */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes app's modules
     */
    init: function () {
      data.init(4);
      dialogBehavior.init();
      setup.init();
    }
  };

})();

/* Starting initialization */
app.init();
