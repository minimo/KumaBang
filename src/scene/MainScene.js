/*
 *  MainScene.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

tm.define("kumabang.MainScene", {
    superClass: tm.app.Scene,

    //マルチタッチ補助クラス
    touches: null,
    touchID: -1,
    
    //パネル配列
    panels: null,

    //経過時間    
    time: 0,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);
        
        //レイヤー準備
        this.panelLayer = tm.app.Object2D().addChildTo(this);
        this.playerLayer = tm.app.Object2D().addChildTo(this);
        this.itemLayer = tm.app.Object2D().addChildTo(this);
        
        //パネル準備
        this.panels = [];
        for (var x = 0; x < 5; x++){
            for (var y = 0; y < 5; y++){
                var p = kumabang.Panel().addChildTo(this.panelLayer);
                p.x = x*PN_W+PN_OffX;
                p.y = y*PN_H+PN_OffY;
                this.panels.push(p);
            }
        }
        kumabang.createSpriteSheet();
        this.player = kumabang.Player().addChildTo(this.playerLayer);
    },

    update: function() {
        var kb = app.keyboard;
        this.time++;
    },
    
    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        this.touchID = e.ID;
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
    },

});


