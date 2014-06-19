/*
 *  TutorialScene.js
 *  2014/06/17
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("kumabang.TutorialScene", {
    superClass: tm.app.Scene,
    
    page: 0,
    maxPage:1,

    init: function(stageNumber) {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //バックグラウンド
        this.bg = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);

        var that = this;
        var lb = this.skip = tm.display.OutlineLabel("SKIP", 30).addChildTo(this);
        lb.setPosition(SC_W*0.1, SC_H*0.9-SC_H);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.tweener.wait(2000).move(SC_W*0.1, SC_H*0.9, 1500,"easeOutElastic");

        var lb = this.next = tm.display.OutlineLabel("NEXT>", 30).addChildTo(this);
        lb.setPosition(SC_W*0.7, SC_H*0.9-SC_H);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.tweener.wait(2000).move(SC_W*0.7, SC_H*0.9, 1500,"easeOutElastic");

        var lb = this.scoreLabel = tm.display.OutlineLabel("STAGE "+stageNumber, 50).addChildTo(this);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.alpha = 0;
        lb.tweener.fadeIn(300);

        //説明パネル
        switch (stageNumber) {
            case 1:
            case 2:
            case 3:
                this.maxPage = 2;
                break;
        }
        this.panels = [];
        for (var i = 0; i < this.maxPage; i++) {
            var pn = tm.display.Sprite("tutorial"+stageNumber+"_"+(i+1), 300, 300).addChildTo(this);
            pn.setPosition(SC_W/2, -SC_H/2);
            this.panels.push(pn);
        }
        this.panels[0].tweener.wait(2000).move(SC_W/2, SC_H/2, 1500,"easeOutElastic");

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
        this.page++;
        if (this.page == this.maxPage) {
            app.popScene();
        } else {
//            this.panels[this.page].setPosition(SC_W/2, SC_H/2);
            this.panels[this.page].tweener.move(SC_W/2, SC_H/2, 1000,"easeOutElastic");
        }
    },

});


