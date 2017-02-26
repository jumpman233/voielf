/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Screen
 * control the game screen, switch to different screens according to player's action
 */
define(['map',
    'gameConfig',
    'player',
    'state'],
    function (map, gc, player, state) {
        function Screen() {
            var screen = this;

            screen.dataSrc = null;

            screen.map = map;
            screen.player = player;
        }
        Screen.prototype = {
            constructor: Screen,
            init: function () {
                var screen = this;

                return screen.map.init()
                    .then(player.init.call(player));
            },
            draw: function () {
                var screen = this;
                var context = gc.context;
                state.update();
                context.clearRect(0,0,gc.width,gc.height);
                screen.map.draw();
                screen.player.draw();
            }
        };
        return new Screen();
});