/**
 * Created by lzh on 2017/2/26.
 */

define(['gameConfig',
    'pitchdetect'],
    function (gc,pd) {
        function State() {
            var state = this;

            state.centerC = 0;
            state.groundHeightC = 0;
            state.up = 0;
            state.isUp = false;
            state.go = false;
        }

        State.prototype = {
            init: function(){
                var state = this;

                state.centerC = -gc.width/2;
                state.groundHeightC = 0;
            },
            update: function () {
                var state = this;
                var volume = pd.getVolume();
                var pitch = pd.getPitch();
                if((volume && volume>=0.1) || state.go){
                    // state.centerC += pd.getVolume() * 5;
                    state.centerC += 1;
                }
                if(volume >= 0.1 && pitch < 3000 && pitch > 200){
                    state.up = pitch;
                    state.isUp = true;
                } else{
                    state.isUp = false;
                }
            }
        };
        return new State();
});