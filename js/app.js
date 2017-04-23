/* Initializes other modules */

'use strict';

window.app = (function () {

/* * * * * * * * * * * * * * * R E T U R N * * * * * * * * * * * * * * * * * */

  return {

    /* -------------------------------------------------------------------------
     * Initializes app's modules
     */
    init: function () {
      window.data.init();
      window.dialogBehavior.init();
      window.setup.init();
    }
  };

})();

/* Starting initialization */
window.app.init();
