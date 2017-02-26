/**
 * Created by lzh on 2017/2/26.
 */

/**
 * GameConfig
 * game config data init and store
 */
define(['jquery','util'],function (jquery,util) {
    function GameConfig() {
        this.canvasId = null;
        this.context = null;
        this.width = null;
        this.height = null;
        this.wPer = 0;
        this.hPer = 0;
        this.wGrid = 0;
        this.hGrid = 0;
        this.fps = 0;
        this.playerSrc = '';
        this.mapSrc = '';
    }
    GameConfig.prototype = {
        constructor: GameConfig,
        getConfig: function (params) {
            console.log(params);
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