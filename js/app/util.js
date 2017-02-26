/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Util
 * util functions
 */
define(['jquery'],function (jquery) {
    function Util() {

    }
    Util.prototype = {
        constructor: Util,
        baseJsonUrl: 'json/',
        getData: function (src) {
            var util = this;
            if(undefined === src){
                throw Error('Util getData(): src is not defined!');
            }
            console.log('开始获取：' + util.baseJsonUrl+src);

            return $.ajax({
                url: util.baseJsonUrl+src,
                async: false,
                cache: false,
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    console.log('获取成功：' + util.baseJsonUrl+src);
                },
                error: function (error) {
                    throw Error('获取失败:' + util.baseJsonUrl+src);
                }
            });
        },
        checkParams: function (needP, params, msg) {
            var f = true;
            for(var i in needP){
                var nName = needP[i];
                var flag = false;
                for(var pName in params){
                    if(pName == nName){
                        flag = true;
                    }

                }
                if(!flag){
                    f = false;
                    throw Error(msg + ' lack param: '+ nName);
                }
            }
            return f;
        }
    };

    return new Util();
});