/* Устанавливает пользовательские настройки игры */

'use strict';

window.settings = (function () {

  return {

    /* размер фаербола */
    fireballSize: 35,

    /* скорость мага */
    wizardSpeed: 7,

    /* ширина мага */
    wizardWidth: 70,

    /*
     * Управляет скоростью фаербола в зависимости от направления ветра
     * @param {boolean} left - направление полета фаербола
     * @return {number}
     */
    getFireballSpeed: function (left) {
      return left ? 10 : 7;
    },

    /*
     * Рассчитывает пропорциональную высоту мага
     * @return {number}
     */
    getWizardHeight: function () {
      return 1.337 * settings.wizardWidth;
    },

    /*
     * Устанавливет положение мага по горизонтали
     * @param {number} height - ширина игровой области
     * @return {number}
     */
    getWizardX: function (width) {
      // середина горизонтали игрового поля
      return width / 2 - settings.wizardWidth / 2;
    },

    /*
     * Устанавливет положение мага по вертикали
     * @param {number} height - высота игровой области
     * @return {number}
     */
    getWizardY: function (height) {
      // 2/3 от высоты игрового поля
      return height / 3 - settings.getWizardHeight() / 2;
    }

  };

})();
