/*
 *  TutorialScene.js
 *  2014/06/17
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("kumabang.TutorialScene", {
    superClass: tm.app.Scene,

    init: function(stageNumber) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);

        var that = this;
        var lb = this.scoreLabel = tm.display.OutlineLabel("SKIP", 20).addChildTo(this);
        lb.setPosition(8, 32);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";

        //説明パネル
        this.panels = [];
        var pn = this.panels[0] = tm.display.Sprite("tutorial1_1", 300, 300).addChildTo(this);
        pn.setPosition(SC_W/2, -SC_H/2);
        pn.tweener.wait(1000).move(SC_W/2, SC_H/2, 1000,"easeOutElastic");
//        this.panels[1] = tm.display.Sprite("tutorial1_2", 300, 300).addChildTo(this);

        //目隠し
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
        app.popScene();
    },

});


