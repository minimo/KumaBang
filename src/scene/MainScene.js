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
    offsetX: 0,
    offsetY: 0,

    //経過時間
    time: 0,

    init: function() {
        this.superInit();
        this.background = "rgba(0, 0, 0, 0.0)";
        
        //バックグラウンド
        this.bg = tm.display.Sprite("bg",3848, 1280).addChildTo(this);

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);
        
        //レイヤー準備
        this.panelLayer = tm.app.Object2D().addChildTo(this);
        this.playerLayer = tm.app.Object2D().addChildTo(this);
        this.itemLayer = tm.app.Object2D().addChildTo(this);

        //プレイヤー準備        
        kumabang.createSpriteSheet();
        this.player = kumabang.Player().addChildTo(this.playerLayer);
        
        this.initPanels();
    },
    
    //パネル初期化
    initPanels: function() {
        this.panelMap = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
        ];

        this.panels = [];
        for (var x = 0; x < MAP_W; x++){
            for (var y = 0; y < MAP_H; y++){
                var p = kumabang.Panel().addChildTo(this.panelLayer);
                p.x = x*PN_W+PN_OffX;
                p.y = y*PN_H+PN_OffY;
                p.mapX = x;
                p.mapY = y;
                p.pattern = rand(1,7);
                this.panels.push(p);
            }
        }
    },

    update: function() {
        var kb = app.keyboard;
        this.time++;
    },

    //指定マップ座標のパネル取得    
    getPanel: function(x, y) {
        return null;
    },

    //パネル判定
    checkPanel: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.disable)continue;
            var px = p.x-PN_W_HALF;
            var py = p.y-PN_H_HALF;
            if (px < x && x < px+PN_W && py < y && y < py+PN_H) return p;
        }
        return null;
    },

    checkMap: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.select || p.disable)continue;
            if (p.mapX == x && p.mapY == y) return p;
        }
        return null;
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        this.touchID = e.ID;
        var sx = this.startX = this.moveX = this.beforeX = e.pointing.x;
        var sy = this.startY = this.moveY = this.beforeY = e.pointing.y;

        var p = this.checkPanel(sx, sy);
        if (p) {
            p.select = true;
            p.tweener.clear().scale(0.9, 200);
            p.remove().addChildTo(this.panelLayer);
            this.selectPanel = p;
            
            this.offsetX = sx-p.x;
            this.offsetY = sy-p.y;
        }
    },

    //タッチorクリック移動処理
    ontouchesmove: function(e) {
        if (this.touchID != e.ID) return;
        var sx = this.moveX = e.pointing.x;
        var sy = this.moveY = e.pointing.y;
        if (this.selectPanel) {
            var p = this.selectPanel;
            p.x = sx-this.offsetX;
            p.y = sy-this.offsetY;

            //選択中パネルの位置に他のパネルが合ったら場所を交換
            var mx = clamp(~~((p.x-PN_OffX+PN_W_HALF)/PN_W), 0, MAP_W-1);
            var my = clamp(~~((p.y-PN_OffY+PN_H_HALF)/PN_H), 0, MAP_H-1);
            if (p.mapX != mx || p.mapY != my) {
                var mp = this.checkMap(mx, my);
                if (mp) {
                    //行き先にパネルが無ければ移動
                    var fp = this.checkMap(p.mapX, p.MapY);
                    if (!fp) {
                        mp.mapX = p.mapX;
                        mp.mapY = p.mapY;
                        mp.move();
                    }
                    p.mapX = mx;
                    p.mapY = my;
                } else {
                    p.mapX = mx;
                    p.mapY = my;
                }
            }
        }
        this.beforeX = sx;
        this.beforeY = sy;
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


