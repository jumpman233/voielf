/**
 * Created by lzh on 2017/2/26.
 */

require.config({
    paths: {
        'jquery': './vendor/jquery.min',
        'pitchdetect': './vendor/pitchdetect',
        'game': './app/game',
        'map': './app/map',
        'util': './app/util',
        'screen': './app/screen',
        'gameConfig': './app/gameConfig',
        'player': './app/player'
    }
});

require(['game'], function (game) {
    var configParam = {
        canvasId: 'gameCanvas',
        wPer: 20,
        hPer: 20,
        fps: 50,
        mapSrc: 'map.json',
        playerSrc: 'player.json'
    };

    game.init(configParam).then(function () {
        game.start();
    });
});