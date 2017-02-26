/**
 * Created by lzh on 2017/2/26.
 */

/**
 * Player
 * a object contains functions about drawing player's run/fall/jump/prepare animation, initialising data
 */
define(['gameConfig',
    'util',
    'state'],function (gc, util, state) {
   function Player() {
       var player = this;

       player.x = 0;
       player.y = 0;

       player.standImgSrc = '';
       player.standImg = null;

       player.runImgList = [];
       player.runImgCount = 0;
       player.runImgDir = '';
       player.runPos = 0;
       player.runPerFrame = 4;
       player.runAniSave = player.runPerFrame;

       player.fallImgList = [];
       player.fallImgCount = 0;
       player.fallImgDir = '';
       player.fallPos = 0;
       player.fallPerFrame = 5;
       player.fallAniSave = player.fallPerFrame;

       player.prepareImgList = [];
       player.prepareImgCount = 0;
       player.prepareImgDir = '';
       player.preparePos = 0;
       player.preparePerFrame = 30;
       player.prepareAniSave = player.preparePerFrame;

       player.widthG = 0;
       player.heightG = 0;
       player.widthC = 0;
       player.heightC = 0;

       player.isRun = false;
       player.isFall = false;
       player.isPrepare = true;

       player.setP = false;
       player.canJump = true;
       player.isJumping = false;
       player.jumpDis = 0;
       player.maxJumpDis = 10;
       player.jumpCd = 20;
       player.jumpCdSave = 0;
   }
   Player.prototype = {
       constructor: Player,
       init: function () {
           var player = this;

           var resolveRes = function (data) {
               player.standImgSrc = data.standImgSrc;
               player.widthG = data.widthG;
               player.heightG = data.heightG;
               player.runImgDir = data.runImgDir;
               player.runImgCount = data.runImgCount;
               player.fallImgCount = data.fallImgCount;
               player.fallImgDir = data.fallImgDir;
               player.prepareImgCount = data.prepareImgCount;
               player.prepareImgDir = data.prepareImgDir;

               player.widthC = gc.wPer * player.widthG;
               player.heightC = gc.hPer * player.heightG;

               player.loadImg();
           };
           util.getData(gc.playerSrc).then(resolveRes);
       },
       loadImg: function () {
           var player = this;

           player.standImg = new Image();
           player.standImg.src = player.standImgSrc;
           player.standImg.width = player.widthC;
           player.standImg.height = player.heightC;

           player.runImgList = [];
           for(var i = 1;i<=player.runImgCount;i++){
               var img = new Image();
               img.width = player.widthC;
               img.height = player.heightC;
               img.src = player.runImgDir+'/'+i+'.png';
               player.runImgList.push(img);
           }

           player.fallImgList = [];
           for(var i = 1;i<=player.fallImgCount;i++){
               var img = new Image();
               img.width = player.widthC;
               img.height = player.heightC;
               img.src = player.fallImgDir+'/'+i+'.jpg';
               player.fallImgList.push(img);
           }

           player.prepareImgList = [];
           for(var i = 1;i<=player.prepareImgCount;i++){
               var img = new Image();
               img.width = player.widthC;
               img.height = player.heightC;
               img.src = player.prepareImgDir+'/'+i+'.png';
               player.prepareImgList.push(img);
           }
       },
       resetPosition: function () {
           var player = this;
           player.y = gc.height - state.groundHeightC - player.heightC;
       },
       draw: function () {
           var player = this;
           //calculate the current player position
           player.x = gc.width / 2 - player.widthC / 2;
           if(!player.setP){
               player.resetPosition();
               player.setP = true;
           }
           if(player.jumpCdSave>=1){
               player.jumpCdSave--;
           }  else if(!player.isJumping){
               player.canJump = true;
           }
           if(state.isUp && player.canJump){
               player.maxJumpDis = state.up / 10;
               player.y -= 3;
               player.isJumping = true;
           } else{
               if(player.isJumping){
                   player.canJump = false;
               }
               if(player.y + 1 >= gc.height - state.groundHeightC - player.heightC){
                   player.y = gc.height - state.groundHeightC - player.heightC;
                   player.isJumping = false;
                   state.go = false;
               } else{
                   player.y += 1;
                   player.jumpCdSave = player.jumpCd;
                   state.go = true;
               }
           }
           if(player.isRun){
               player.drawRun();
           } else if(player.isFall){
               player.drawFall();
           } else if(player.isPrepare){
               player.drawPrepare();
           }
       },
       drawRun: function () {
           var player = this;
           gc.context.drawImage(player.runImgList[player.runPos],
               player.x,player.y,player.widthC,player.heightC);

           player.runAniSave--;
           if(player.runAniSave == 0){
               player.runAniSave = player.runPerFrame;
               player.runPos++;
           }
           if(player.runPos>=player.runImgList.length){
               player.runPos = 0;
               player.isRun = false;
               player.isFall = true;
           }
       },
       drawFall: function () {
           var player = this;
           gc.context.drawImage(player.fallImgList[player.fallPos],
               player.x,player.y,player.widthC,player.heightC);

           player.fallAniSave--;
           if(player.fallAniSave <= 0){
               player.fallAniSave = player.fallPerFrame;
               player.fallPos++;
           }
           if(player.fallPos>=player.fallImgList.length){
               player.fallPos = 0;
               player.isPrepare = true;
               player.isFall = false;
           }
       },
       drawPrepare: function () {
           var player = this;
           gc.context.drawImage(player.prepareImgList[player.preparePos],
               player.x,player.y,player.widthC,player.heightC);

           player.prepareAniSave--;
           if(player.prepareAniSave <= 0){
               player.prepareAniSave = player.preparePerFrame;
               player.preparePos++;
           }
           if(player.preparePos>=player.prepareImgList.length){
               player.isPrepare = false;
               player.isRun = true;
               player.preparePos = 0;
           }
       }
   };
   return new Player();
});