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
    
    //選択中パネル
    selectPanel: null,
    
    //タッチ情報
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
    beforeX: 0,
    beforeY: 0,

    //経過時間
    time: 0,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        
        this.bg = 

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
                p.stageX = x;
                p.stageY = y;
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

    //パネル判定
    panelCheck: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.disable)continue;
            if (p.x-PN_W/2 < x && x < p.x+PN_W/2 && p.y-PN_H/2 < y && y < p.y+PN_H/2) {
                return p;
            }
        }
        return null;
    },
    
    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        this.touchID = e.ID;
        var sx = this.startX = e.pointing.x;
        var sy = this.startY = e.pointing.y;

        var p = this.panelCheck(sx, sy);
        if (p) {
            p.select = true;
            p.tweener.scale(1.3, 200);
            p.remove().addChildTo(this.panelLayer);
            this.selectPanel = p;
        }
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;
        var sx = this.moveX = e.pointing.x;
        var sy = this.moveY = e.pointing.y;
        if (this.selectPanel) {
            var p = this.selectPanel;
            p.x += e.pointing.deltaPosition.x;
            p.y += e.pointing.deltaPosition.y;
        }
        this.beforeX = sx;
        this.beforeY = sx;
    },

    //タッチorクリック終了処理
    ontouchesend: function(e) {
        if (this.touchID != e.ID) return;
        if (this.selectPanel) {
            var p = this.selectPanel;
            p.select = false;
            p.reverse();
            this.selectPanel = null;
        }
    },

});


