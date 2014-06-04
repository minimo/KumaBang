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
        this.background = "rgba(0, 0, 0, 1.0)";

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);
        
        //パネル準備
        this.panels = [];
        var p = kumabang.Panel().addChildTo(this);
        
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


