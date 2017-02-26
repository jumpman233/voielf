/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Map
 * a object contains the functions about map drawing and data getting
 * have map data
 */
define(['jquery',
    'util',
    'gameConfig',
    'screen'],
    function (jquery, util, gc,screen) {
        function Map() {
            var map = this;

            map.floorList = [];
            map.blockList = [];
            map.length = 0;
        }
        Map.prototype = {
            getMap: function () {
                var map = this;
                function resFunc(data) {
                    map.length = data.length;
                    for(var i in data.block){
                        var item = data.block[i];
                        map.blockList.push(item);
                    }
                    for(var i in data.floor){
                        var item = data.floor[i];
                        item.startC = item.startG * gc.wPer;
                        item.widthC = item.widthG * gc.wPer;
                        item.heightC = item.heightG * gc.hPer;
                        map.floorList.push(item);
                    }
                    console.log(map);
                }
                return util.getData(map.src).then(resFunc);
            },
            init: function () {
                var map = this;

                if(undefined !== gc.mapSrc){
                    map.src = gc.mapSrc;
                }

                return this.getMap();
            },
            draw: function (pos) {
                var map = this;
                map.drawFloor(pos);
            },
            drawFloor: function (pos) {
                var pos = 0;
                var ctx = gc.context;
                var map = this;
                var list = [];
                for(var i in map.floorList){
                    if(map.floorList[i].startC - pos >= 0 ||
                    map.floorList[i].startC - pos <= gc.width){
                        list.push(map.floorList[i]);
                    }
                }
                ctx.fillStyle = '#000';
                for(var i in list){
                    var item = list[i];
                    ctx.strokeRect(item.startC - pos,
                    gc.height - item.heightC,
                    item.widthC,
                    item.heightC);
                }
            }
        };
        return new Map();
});