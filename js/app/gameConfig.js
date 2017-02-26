/**
 * Created by lzh on 2017/2/26.
 */

define(['jquery','util'],function (jquery,util) {
    function GameConfig() {
        this.canvasId = null;
        this.width = null;
        this.height = null;
        this.wGrid = null;
        this.hGrid = null;
        this.fps = null;
    }
    GameConfig.prototype = {
        constructor: GameConfig,
        getConfig: function (params) {
            var defered = $.Deferred();
            var gc = this;
            var needP = ['canvasId', 'wPer', 'hPer', 'fps','mapSrc','playerSrc'];
            util.checkParams(needP, params, 'GameConfig getConfig');

            gc.canvasId = params.canvasId;
            gc.wPer = params.wPer;
            gc.hPer = params.hPer;
            gc.fps = params.fps;
            gc.mapSrc = params.mapSrc;
            gc.playerSrc = params.playerSrc;

            gc.context = $('#' + gc.canvasId)[0].getContext('2d');
            gc.width = gc.context.canvas.width;
            gc.height = gc.context.canvas.height;
            gc.wGrid = gc.width / gc.wPer;
            gc.hGrid = gc.height / gc.hPer;
            console.log(gc);
            defered.resolve();
            return defered;
        }
    };
    return new GameConfig();
});