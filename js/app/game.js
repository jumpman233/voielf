/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Game
 * game init, game entrance
 */
define(['pitchdetect',
    'screen',
    'gameConfig',
    'state'],function (pitchdetect, screen, gc,state) {
    function Game() {
        var game = this;

        game.screen = screen;
    }

    Game.prototype = {
        /**
         * get config data
         * init state
         * init screen |
         *             | init map
         *             | init player
         */
        init: function (config) {
            var game = this;

            return gc
                .getConfig(config)
                .then(state.init())
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
