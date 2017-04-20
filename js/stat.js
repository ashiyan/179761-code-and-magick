/*
 * Draws a graph with statistics
 * @param {RenderingContext} - context
 * @param {Array<string>} - array with player's names
 * @param {Array<string>} - array with player's times
 */

'use strict';

(function () {

  window.renderStatistics = function (ctx, names, times) {

    /* Rectangle shadow */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);

    /* Rectangle */
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(100, 10, 420, 270);

    /* Rectangle header */
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    /* Histogram parameters */
    var histoFieldHeight = 150;
    var histoColumnWidth = 40;
    var histoColumnOffset = 90;

    /* Maximal time and step for values normalization */
    var maxTime = Math.max.apply(null, times);
    var step = histoFieldHeight / maxTime;

    /* Histogram drawing beginning from the lower left corner */
    ctx.textBaseline = 'bottom';

    /* Histogram */
    for (var i = 0; i < times.length; i++) {
      /* Player names output */
      ctx.fillText(
          names[i],
          140 + histoColumnOffset * i,
          110 + histoFieldHeight
      );

      /* Defining colors for rendering columns */
      ctx.fillStyle = names[i] === 'Вы' ?
          'rgba(255, 0, 0, 1)' :
          'rgba(0, 0, 255,' + (Math.random() + 0.1).toFixed(1) + ')';

      /* Columns rendering */
      ctx.fillRect(
          140 + histoColumnOffset * i,
          90 + histoFieldHeight - times[i] * step,
          histoColumnWidth,
          times[i] * step
      );

      /* Times output */
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(
          Math.floor(times[i]),
          140 + histoColumnOffset * i,
          85 + histoFieldHeight - times[i] * step
      );
    }

  };

})();
