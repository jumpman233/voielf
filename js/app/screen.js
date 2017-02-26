/**
 * Created by lzh on 2017/2/26.
 */

define(['map',
    'gameConfig'],
    function (map,gc) {
        function Screen() {
            var screen = this;

            screen.dataSrc = null;
            screen.pos = 0;

            screen.map = map;
        }
        Screen.prototype = {
            constructor: Screen,
            init: function () {
                var screen = this;

                return screen.map.init();
            },
            draw: function () {
                var screen = this;
                var context = gc.context;
                context.clearRect(0,0,screen.width,screen.height);
                screen.map.draw();
            }
        };
        return new Screen();
});