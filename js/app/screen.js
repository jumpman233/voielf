/**
 * Created by lzh on 2017/2/26.
 */

define(['map',
    'gameConfig',
    'player'],
    function (map,gc,player) {
        function Screen() {
            var screen = this;

            screen.dataSrc = null;
            screen.pos = 0;

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
                context.clearRect(0,0,screen.width,screen.height);
                screen.map.draw();
                screen.player.draw();
            }
        };
        return new Screen();
});