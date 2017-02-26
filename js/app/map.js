/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Map
 * a object contains the functions about drawing map, getting data, storing data
 *
 */
define(['jquery',
    'util',
    'gameConfig',
    'screen',
    'state'],
    function (jquery, util, gc, screen, state) {
        function Map() {
            var map = this;

            map.floorList = [];
            map.blockList = [];
            map.length = 0;
        }
        Map.prototype = {
            // there will be two parts inserted to the importing map,
            // one is at the head of the map, another is at the end,
            // they are both frank ground and the height is equal
            getMap: function () {
                var map = this;
                function resFunc(data) {
                    map.length = data.length;
                    for(var i in data.block){
                        var item = data.block[i];
                        map.blockList.push(item);
                    }
                    data.floor.push({
                        "startG": -gc.wGrid,
                        "widthG": gc.wGrid,
                        "heightG": 6
                    });
                    data.floor.push({
                       "startG": data.length,
                        "widthG": gc.wGrid,
                        "heightG": 6
                    });
                    for(var i in data.floor){
                        var item = data.floor[i];
                        item.startC = item.startG * gc.wPer;
                        item.widthC = item.widthG * gc.wPer;
                        item.heightC = item.heightG * gc.hPer;
                        map.floorList.push(item);
                    }
                    map.floorList.push({

                    });
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
            draw: function () {
                var map = this;
                map.drawFloor();
            },
            drawFloor: function () {
                var pos = state.centerC - gc.width/2;
                var ctx = gc.context;
                var map = this;
                var list = [];
                for(var i in map.floorList){
                    var mapPart = map.floorList[i];
                    //check if draw the map part
                    if(mapPart.startC - pos >= 0 ||
                    mapPart.startC - pos <= gc.width){
                        list.push(mapPart);
                    }
                    //update ground height value of the screen center
                    if(mapPart.startC - pos <= gc.width / 2 &&
                        mapPart.startC + mapPart.widthC - pos >= gc.width / 2){
                        state.groundHeightC = mapPart.heightC;
                    }
                }
                //start to draw floor
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