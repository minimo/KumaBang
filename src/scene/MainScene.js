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

    //エンドレスモード     
    endless: false,   
    
    //現在ステージデータ
    stageNumber: 1,
    stageData: null,

    //スタート＆ゴールパネル座標
/*
    startX: 0,
    startY: 0,
    goalX: 0,
    goalY: 0,
*/
    //状態フラグ
    ready: false,   //準備ＯＫ
    start: false,   //ゲームスタート

    //パネル配列
    panels: null,
    
    //選択中パネル
    selectPanel: null,
    
    //タッチ情報
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
        this.bg = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);

        //マルチタッチ初期化
        this.touches = tm.input.TouchesEx(this);
        
        //レイヤー準備
        this.panelLayer = tm.app.Object2D().addChildTo(this);
        this.playerLayer = tm.app.Object2D().addChildTo(this);
        this.itemLayer = tm.app.Object2D().addChildTo(this);

        //プレイヤー準備        
        kumabang.createSpriteSheet();
        this.player = kumabang.Player().addChildTo(this.playerLayer);
        this.player.setPosition(PN_OffX, PN_OffY);
        this.player.visible = false;

        //ステージ開始時演出用
        this.egg = kumabang.Egg();
        this.egg.player = this.player;
        this.egg.setPosition(PN_OffX, PN_OffY);

        //状態フラグ初期化
        this.ready = true;
        this.start = false;
    },
    
    update: function() {
        if (this.ready) {
            //パネル初期化        
            this.initStage();
            this.ready = false;
            this.start = true;
        }
        if (!this.start) return;

        var kb = app.keyboard;
        this.time++;
    },

    //ステージ初期化
    initStage: function() {
        //ステージデータコピー
        this.stageData = kumabang.stageData[this.stageNumber-1];

        //パネル全消去
        if (this.panels) {
            for (i in this.panels) {
                this.panels[i].remove();
            }
        }

        //プレイヤー初期位置

        //パネル準備
        this.panels = [];
        for (var y = 0; y < MAP_H; y++){
            for (var x = 0; x < MAP_W; x++){
                var p = kumabang.Panel().addChildTo(this.panelLayer);
                p.x = x*PN_W+PN_OffX;
                p.y = y*PN_H+PN_OffY;
                p.mapX = x;
                p.mapY = y;
                p.pattern = this.stageData.map[y][x];
                var item = this.stageData.item[y][x];
                if (item != 0) p.shuffle = false;
                if (item != 0 && item != 6)p.onItem = true;
                if (item == 8) {
                    this.startX = x;
                    this.startY = y;
                }
                if (item == 9) {
                    this.goalX = x;
                    this.goalY = y;
                }

                this.panels.push(p);
            }
        }
        //パネルシャッフル
        for (var i = 0; i < rand(15, 20); i++){
            var a = rand(0, this.panels.length-1);
            var b = rand(0, this.panels.length-1);
            var p1 = this.panels[a];
            var p2 = this.panels[b];
            if (a == b || !p1.shuffle || !p2.shuffle) {i--; continue;}
            var tx = p1.mapX, ty = p1.mapY;
            p1.move(p2.mapX, p2.mapY);
            p2.move(tx, ty);
        }
        
        //プレイヤー準備
        var sx = PN_OffX+this.startX*PN_W;
        var sy = PN_OffY+this.startY*PN_H;
        this.player.setPosition(sx, sy);
        this.player.scaleX = -1;
        this.player.visible = false;
        this.egg.addChildTo(this.playerLayer);
        this.egg.scaleX = -1;
        this.egg.setPosition(sx, sy);
        this.egg.gotoAndPlay("enter");

        //ゴール準備
        if (!this.endless) {
            var gx = PN_OffX+this.goalX*PN_W;
            var gy = PN_OffY+this.goalY*PN_H;
        }

        //スタートメッセージ
        var lb = tm.display.OutlineLabel("READY", 30).addChildTo(this);
        lb.setPosition(SC_W/2, SC_H/2);
        lb.alpha = 0;
        lb.fontFamily = "'Orbitron'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 25;
        lb.outlineWidth = 2;
        lb.tweener.clear().fadeIn(100).wait(1000).fadeOut(100).call(function(){lb.text = "START!!";});
        lb.tweener.to({x: SC_W/2, y: -SC_H}, 1).fadeIn(1);
        lb.tweener.wait(500).to({x: SC_W/2, y: SC_H/2, scaleX: 1, scaleY: 1}, 500, "easeOutQuint");
        lb.tweener.wait(500).to({x: SC_W/2, y: SC_H*1.5, scaleX: 1, scaleY: 1}, 1000, "easeOutQuint").call(function(){lb.remove();});
/*
        lb.tweener.clear().wait(500).to({x: SC_W/2, y: SC_H/2, scaleX: 1, scaleY: 1}, 500, "easeOutQuint").fadeOut(300).call(function(){lb.text = "START!!";});
        lb.tweener.to({x: SC_W/2, y: -SC_H}, 1).fadeIn(1);
        lb.tweener.wait(500).to({x: SC_W/2, y: SC_H/2, scaleX: 1, scaleY: 1}, 500, "easeOutQuint").fadeOut(300).call(function(){lb.remove();});
*/
    },

    //指定マップ座標のパネル取得    
    getPanel: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.select)continue;
            if (p.mapX == x && p.mapY == y) return p;
        }
        return null;
    },

    //スクリーン座標上のパネル判定
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

    //マップ座標上のパネル判定
    checkMap: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.select)continue;
            if (p.mapX == x && p.mapY == y) return p;
        }
        return null;
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;
        var sx = this.moveX = this.beforeX = e.pointing.x;
        var sy = this.moveY = this.beforeY = e.pointing.y;

        var p = this.checkPanel(sx, sy);
        if (p) {
            p.select = true;
            p.tweener.clear().scale(0.9, 100);
            p.remove().addChildTo(this.panelLayer); //一番手前に持ってくる
            this.selectPanel = p;
            
            //パネルの座標とタッチ座標のオフセットを計算
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
            //パネルが領域外に行かない様に制限
            p.x = clamp(sx-this.offsetX, PN_OffX, PN_OffX+PN_W*(MAP_W-1));
            p.y = clamp(sy-this.offsetY, PN_OffY, PN_OffY+PN_H*(MAP_H-1));

            //選択中パネルの位置に他のパネルが合ったら場所を交換
            var mx = clamp(~~((p.x-PN_OffX+PN_W_HALF)/PN_W), 0, MAP_W-1);
            var my = clamp(~~((p.y-PN_OffY+PN_H_HALF)/PN_H), 0, MAP_H-1);
            if (p.mapX != mx || p.mapY != my) {
                var mp = this.checkMap(mx, my);
                if (mp && !mp.disable) {
                    //行き先にパネルが無ければ移動
                    var fp = this.checkMap(p.mapX, p.MapY);
                    if (!fp) mp.move(p.mapX, p.mapY);
                    p.mapX = mx;
                    p.mapY = my;
                }
                if (mp == null) {
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
        this.touchID = -1;
        if (this.selectPanel) {
            var p = this.selectPanel;
            p.select = false;
            p.reverse();
            this.selectPanel = null;
        }
    },

});


