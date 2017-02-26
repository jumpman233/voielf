/**
 * Created by lzh on 2017/2/26.
 */

define(['pitchdetect',
    'screen',
    'gameConfig'],function (pitchdetect, screen, gc) {
    function Game(params) {
        var game = this;

        game.screen = screen;
    }

    Game.prototype = {
        init: function (config) {
            var game = this;

            return gc
                .getConfig(config)
                .then(game.screen.init());
        },
        start: function () {
            var game = this;

            setInterval(function () {
                game.screen.draw();
            },1000 / gc.fps);
        }
    };
    return new Game();
});
