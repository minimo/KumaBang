/*
 *  TitileScene.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("kumabang.TitleScene", {
    superClass: tm.app.Scene,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);

        var lb = this.title1 = tm.display.OutlineLabel("PIYOPIYO", 30).addChildTo(this);
        lb.setPosition(SC_W*0.4, SC_H*0.2);
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 50;
        lb.outlineWidth = 2;
        var lb = this.title2 = tm.display.OutlineLabel("BANGBANG", 30).addChildTo(this);
        lb.setPosition(SC_W*0.6, SC_H*0.3.5);
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 50;
        lb.outlineWidth = 2;
        var lb = this.title3 = tm.display.OutlineLabel("（仮）", 30).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.5);
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 50;
        lb.outlineWidth = 2;
//        lb.tweener.moveBy(0,-30, 1500,"easeOutQuad").fadeOut(500).call(function(){lb.remove();});

        var lb = this.startLabel = tm.display.OutlineLabel("TOUCH START", 30).addChildTo(this);
        lb.setPosition(SC_W*0.5, SC_H*0.8);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 20;
        lb.outlineWidth = 2;

        this.mask = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);
        this.mask.tweener.clear().fadeOut(500);
    },

    update: function() {
    },

    //タッチorクリック開始処理
    ontouchstart: function(e) {
    },

    //タッチorクリック移動処理
    ontouchmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchend: function(e) {
        var x = e.x;
        var y = e.y;
        app.replaceScene(kumabang.MainScene());
    },

});


