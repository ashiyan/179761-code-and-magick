/* Sets the user's game settings */

/* global settings */

'use strict';

window.settings = (function () {

  return {

    /* fireball size */
    fireballSize: 35,

    /* wizard's speed */
    wizardSpeed: 7,

    /* wizard's width */
    wizardWidth: 70,

    /*
     * Controls fireball speed depending on wind direction
     * @param {boolean} left - wind direction
     * @return {number}
     */
    getFireballSpeed: function (left) {
      var speed = left ? 10 : 7;
      return speed;
    },

    /*
     * Calculates the proportional wizard's height
     * @return {number}
     */
    getWizardHeight: function () {
      var height = 1.337 * settings.wizardWidth;
      return height;
    },

    /*
     * Set the horizontal position of the wizard
     * @param {number} height - width of the game area
     * @return {number}
     */
    getWizardX: function (width) {
      // середина горизонтали игрового поля
      var coordX = width / 2 - settings.wizardWidth / 2;
      return coordX;
    },

    /*
     * Set the vertical position of the wizard
     * @param {number} height - height of the game area
     * @return {number}
     */
    getWizardY: function (height) {
      // 2/3 from the height of the game area
      var coordY = height / 3 - settings.getWizardHeight() / 2;
      return coordY;
    }

  };

})();
