/*
 * Repaints elements in the required color using callback functions
 * @param {HTMLElement} - element for painting
 * @param {Array<string>} - array with colors
 * @param {function} - painting callback-function
 */

'use strict';

(function () {

  window.colorizeElement = function (element, palette, colorizeFunction) {
    var randomIndex = Math.floor(Math.random() * palette.length);
    var color = palette[randomIndex];
    colorizeFunction(element, color);
  };

})();
