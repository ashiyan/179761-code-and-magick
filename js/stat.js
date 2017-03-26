'use strict';

window.renderStatistics = function(ctx, names, times) {

    // тень прямоугольника
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);

    // прямоугольник
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(100, 10, 420, 270);

    // заголовок прямоугольника
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    // параметры гистограммы
    var histoFieldHeight = 150;
    var histoColumnWidth = 40;
    var histoColumnOffset = 90;
    var histoMyColor = 'rgba(255, 0, 0, 1)';
    var histoOthersColor = 'rgba(0, 0, 255,' + Math.random().toFixed(1) + ')';

    // максимальное время и шаг для нормирования значений
    var maxTime = Math.max.apply(null, times);
    var step = histoFieldHeight / maxTime;

    // начало отрисовки гистограммы от нижнего левого угла
    ctx.textBaseline="bottom";

    // гистограмма
    for (var i = 0; i < times.length; i++) {
        // вывод имен игроков
        ctx.fillText(names[i],
                     140 + histoColumnOffset * i,
                     110 + histoFieldHeight);

        // отрисовка столбцов
        ctx.fillStyle = names[i] === 'Вы' ? histoMyColor : histoOthersColor;
        ctx.fillRect(140 + histoColumnOffset * i,
                     90 + histoFieldHeight - times[i] * step,
                     histoColumnWidth,
                     times[i] * step);

        // вывод времени
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillText(Math.floor(times[i]),
                     140 + histoColumnOffset * i,
                     85 + histoFieldHeight - times[i] * step);
    }

};