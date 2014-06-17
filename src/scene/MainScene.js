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
    
    //ゲーム内情報
    score: 0,   //スコア
    life: 3,    //ライフ
    passPanel: 0,       //ステージ内通過パネル
    passPanelTotal: 0,  //通過パネル総計
    
    //現在ステージデータ
    stageNumber: 1,
    stageData: null,
    retryStage: false,

    //スタート＆ゴールパネル座標
    startX: 0,
    startY: 0,
    goalX: 0,
    goalY: 0,
    startPattern: 0,

    //状態フラグ
    ready: false,   //準備ＯＫ
    start: false,   //ゲームスタート
    stop: false,

    //１つのパネルを通る時間（milli second)
    speed: 2000,

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

    //再生中BGM
    bgm: null,

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
        this.lowerLayer = tm.app.Object2D().addChildTo(this);
        this.panelLayer = tm.app.Object2D().addChildTo(this);
        this.playerLayer = tm.app.Object2D().addChildTo(this);
        this.itemLayer = tm.app.Object2D().addChildTo(this);

        //プレイヤー準備        
        kumabang.createSpriteSheet();
        this.player = kumabang.Player().addChildTo(this.playerLayer);
        this.player.setPosition(PN_OFFX, PN_OFFY);
        this.player.visible = false;

        //ステージ開始時演出用
        this.egg = kumabang.Egg();
        this.egg.player = this.player;
        this.egg.setPosition(PN_OFFX, PN_OFFY);

        //フラグ初期化
        this.ready = true;
        this.start = false;

        //スコア表示
        var that = this;
        var lb = this.scoreLabel = tm.display.OutlineLabel("得点:", 30).addChildTo(this);
        lb.setPosition(8, 32);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "left";
        lb.baseline  = "middle";
        lb.fontSize = 20;
        lb.outlineWidth = 2;
        lb.update = function() {
            this.text = "得点:"+that.score;
        }

        //目隠し
        this.mask = tm.display.Sprite("bg", SC_W*2, SC_H*2).addChildTo(this);
    },
    
    update: function() {
        if (this.ready) {
            //パネル初期化
            this.initStage();
            this.ready = false;
            this.start = false;
            this.stop = false;

            this.mask.tweener.clear().fadeOut(300);
        }
        if (!this.start || this.stop) return;

        this.tickPlayer();
        this.tickPanel();

        var kb = app.keyboard;
        this.time++;
    },

    //ステージ初期化
    initStage: function() {
        //ステージデータコピー
        this.stageData = kumabang.stageData[this.stageNumber-1];

        if (!this.retryStage) {
            app.playBGM("bgm"+this.stageNumber);
        }

        //フラグ初期化
        this.ready = true;
        this.start = false;
        
        //通過パネル数初期化
        this.passPanel = 0;

        //パネル全消去
        if (this.panels) {
            for (var i in this.panels) {
                if (this.panels[i].item) this.panels[i].item.remove();
                this.panels[i].remove();
            }
        }

        //マップ構築
        this.panels = [];
        for (var y = 0; y < MAP_H; y++){
            for (var x = 0; x < MAP_W; x++){
                var ptn = this.stageData.map[y][x];
                var p = this.addPanel(x, y, ptn);
                //スタート位置
                if (7 < ptn && ptn < 12) {
                    this.startX = x;
                    this.startY = y;
                    this.startPattern = p.pattern;
                }
                //ゴール位置
                if (11 < ptn && ptn < 16) {
                    this.goalX = x;
                    this.goalY = y;
                }
                this.panels.push(p);

                //アイテム追加
                var item = this.stageData.item[y][x];
                if (item != 0) p.shuffle = false;
                if (item > 0) {
                    this.addItem(x, y, item);
                    p.onItem = true;
                }
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

        //プレイヤー初期化
        var sx = PN_OFFX+this.startX*PN_W;
        var sy = PN_OFFY+this.startY*PN_H;
        if (this.startPattern == 10) {
            this.player.scaleX = 1;
        } else {
            this.player.scaleX = -1;
        }
        this.player.setPosition(sx, sy);
        this.player.bx = this.player.x;
        this.player.by = this.player.y;
        this.player.startup();

        //スタート演出初期化
        this.egg.addChildTo(this.playerLayer);
        this.egg.scaleX = -1;
        this.egg.setPosition(sx, sy);
        this.egg.gotoAndPlay("enter");
        this.egg.startup();

        //ゴール準備
        if (!this.endless) {
            var gx = PN_OFFX+this.goalX*PN_W;
            var gy = PN_OFFY+this.goalY*PN_H;
        }

        //スタートメッセージ
        var that = this;
        var lb = tm.display.OutlineLabel("３", 30).addChildTo(this);
        lb.setPosition(SC_W/2, -SC_H/2);
        lb.alpha = 0;
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 60;
        lb.outlineWidth = 2;
        lb.tweener.clear();
        lb.tweener.wait(600);
        lb.tweener.call(function(){lb.text = "３";}).to({x: SC_W/2, y: -SC_H/2}, 1).fadeIn(1).move(SC_W/2, SC_H/2, 600, "easeOutBounce").wait(100).fadeOut(100);
        lb.tweener.call(function(){lb.text = "２";}).to({x: SC_W/2, y: -SC_H/2}, 1).fadeIn(1).move(SC_W/2, SC_H/2, 600, "easeOutBounce").wait(100).fadeOut(100);
        lb.tweener.call(function(){lb.text = "１";}).to({x: SC_W/2, y: -SC_H/2}, 1).fadeIn(1).move(SC_W/2, SC_H/2, 600, "easeOutBounce").wait(100).fadeOut(100);
        lb.tweener.call(function(){lb.text = "スタート！";}).to({x: SC_W/2, y: -SC_H/2}, 1).fadeIn(1).move(SC_W/2, SC_H/2, 700, "easeOutBounce");
        lb.tweener.call(function(){that.start = true;});
        lb.tweener.wait(200);
        lb.tweener.move(SC_W/2, SC_H/2, 500, "easeOutQuint").fadeOut(200).call(function(){lb.remove();});
    },

    //ステージ再スタート
    restartStage: function() {
        //フラグ初期化
        this.ready = true;
        this.start = false;
    },

    //パネル追加
    addPanel: function(x, y, ptn) {
        if (this.checkMapPanel(x, y)) return null;

        var p = kumabang.Panel().addChildTo(this.panelLayer);
        p.x = x*PN_W+PN_OFFX;
        p.y = y*PN_H+PN_OFFY;
        p.mapX = x;
        p.mapY = y;
        p.scene = this;
        p.pattern = ptn;

        return p;
    },

    //アイテム追加
    addItem: function(x, y, ptn) {
        ptn = ptn | 0;
        var p = this.checkMapPanel(x, y);
        if (p == null || p.item != null) return null;
        p.item = kumabang.Item(p, ptn).addChildTo(this.itemLayer);
    },

    //スクリーン座標上のパネル判定
    checkScreenPanel: function(x, y) {
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
    checkMapPanel: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.select)continue;
            if (p.mapX == x && p.mapY == y) return p;
        }
        return null;
    },

    //マップ座標上のパネル取得
    getMapPanel: function(x, y) {
        var len = this.panels.length;
        for (var i = 0; i< len; i++) {
            var p = this.panels[i];
            if (p.mapX == x && p.mapY == y) return p;
        }
        return null;
    },

    //マップ上イベントチェック（アイテム取得等）
    checkMapEvent: function(x, y) {
        var p = this.getMapPanel(x, y);
        if (p == null) return;
        if (p.item == null)return;
        p.onItem = false;
        p.item.ok = false;
        p.item.remove();
        p.item = null;

        this.score += 500;
        var lb = tm.display.OutlineLabel("500", 30).addChildTo(this.itemLayer);
        lb.setPosition(p.x, p.y-30);
        lb.fontFamily = "'KS-Kohichi-FeltPen'";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 20;
        lb.outlineWidth = 2;
        lb.tweener.moveBy(0,-30, 1500,"easeOutQuad").fadeOut(500).call(function(){lb.remove();});
    },

    //プレイヤー処理（パネル＆アイテム）
    tickPlayer: function() {
        var miss = false, goal = false;
        var that = this;
        var player = this.player;
        var passPanel = null;
        var px = ~~((player.x-PN_OFFX+PN_W/2)/PN_W), py = ~~((player.y-PN_OFFY+PN_H/2)/PN_H);
        if (player.x-PN_OFFX+PN_W/2 < 0 || player.y-PN_OFFY+PN_H/2 < 0)miss = true;
        if (player.mapX != px || player.mapY != py) {
            var p = this.checkMapPanel(px, py);
            if (p) {
                passPanel = player.onPanel;
                p.onPlayer = true;
                p.inX = vx;
                p.inY = vy;
                player.onPanel = p;
                var vx = px-player.mapX;
                var vy = py-player.mapY;
                var dis = PN_SIZE;
                var spd = this.speed;
                player.tweener.call(function(){that.checkMapEvent(px, py);});
                switch (p.pattern) {
                    case 1: //横
                        if (vx != 0) {
                            player.tweener.moveBy(dis*vx, 0, spd);
                        } else {
                            miss = true;
                        }
                        break;
                    case 2: //縦
                        if (vy != 0) {
                            player.tweener.moveBy(0, dis*vy, spd);
                        } else {
                            miss = true;
                        }
                        break;
                    case 3: //十字
                        if (vx != 0) {
                            player.tweener.moveBy(dis*vx, 0, spd);
                        } else {
                            player.tweener.moveBy(0, dis*vy, spd);
                        }
                        break;
                    case 4: //右－下
                        if (vx == -1) {
                            //右から進入
                            player.tweener.moveBy(0, dis, spd);
                        } else if (vy == -1) {
                            //下から進入
                            player.tweener.moveBy(dis, 0, spd);
                        } else {
                            miss = true;
                        }
                        break;
                    case 5: //左－下
                        if (vx == 1) {
                            //左から進入
                            player.tweener.moveBy(0, dis, spd);
                        } else if (vy == -1) {
                            //下から進入
                            player.tweener.moveBy(-dis, 0, spd);
                        } else {
                            miss = true;
                        }
                        break;
                    case 6: //右－上
                        if (vx == -1) {
                            //右から進入
                            player.tweener.moveBy(0, -dis, spd);
                        } else if (vy == 1) {
                            //上から進入
                            player.tweener.moveBy(dis, 0, spd);
                        } else {
                            miss = true;
                        }
                        break;
                    case 7: //左－下
                        if (vx == 1) {
                            //左から進入
                            player.tweener.moveBy(0, -dis, spd);
                        } else if (vy == 1) {
                            //上から進入
                            player.tweener.moveBy(-dis, 0, spd);
                        } else {
                            miss = true;
                        }
                        break;

                    //スタート地点用パネル
                    case 8:
                        player.tweener.clear();
                        player.tweener.moveBy(dis, 0, spd)
                        break;
                    case 9:
                        player.tweener.clear();
                        player.tweener.moveBy(0, dis, spd);
                        break;
                    case 10:
                        player.tweener.clear();
                        player.tweener.moveBy(-dis, 0, spd);
                        break;
                    case 11:
                        player.tweener.clear();
                        player.tweener.moveBy(0, -dis, spd);
                        break;

                    //ゴール地点用パネル
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        goal = true;
                        break;
                }
                player.mapX = px;
                player.mapY = py;
            } else {
                miss = true;
            }
        }
        //ミス！！
        if (miss) {
            player.action("miss");
            this.stop = true;
            var that = this;
            var lb = tm.display.OutlineLabel("ミス！！", 30).addChildTo(this);
            lb.setPosition(SC_W/2, -SC_H/2);
            lb.fontFamily = "'KS-Kohichi-FeltPen'";
            lb.align     = "center";
            lb.baseline  = "middle";
            lb.fontSize = 60;
            lb.outlineWidth = 2;
            lb.tweener.clear();
            lb.tweener.move(SC_W/2, SC_H/2, 1000, "easeOutBounce").wait(1000).fadeOut(100);
            lb.tweener.call(function(){lb.remove();});
            this.mask.tweener.clear().wait(3000).fadeIn(500).wait(1000).call(function(){that.restartStage();});
            tm.asset.AssetManager.get("miss").clone().play();
            this.retryStage = true;
        } else {
            if (passPanel) passPanel.onPlayer = false;
        }
        //ゴール！
        if (goal) {
            player.action("goal");
            this.stop = true;
            var that = this;
            var lb = tm.display.OutlineLabel("ゴール！！", 30).addChildTo(this);
            lb.setPosition(SC_W/2, -SC_H/2);
            lb.fontFamily = "'KS-Kohichi-FeltPen'";
            lb.align     = "center";
            lb.baseline  = "middle";
            lb.fontSize = 60;
            lb.outlineWidth = 2;
            lb.tweener.clear();
            lb.tweener.move(SC_W/2, SC_H/2, 4000, "easeOutBounce").wait(1000).fadeOut(100);
            lb.tweener.call(function(){lb.remove();});
            this.mask.tweener.clear().wait(7000).fadeIn(500).wait(1000).call(function(){that.restartStage();});
            this.stageNumber++;
            this.retryStage = false;
        }
    },

    //パネル処理
    tickPanel: function() {
        for (var i = 0; i< this.panels.length; i++) {
            var p = this.panels[i];
            if (p.dropped) {
                this.panels.splice(i,1);
            }
        }
    },

    //タッチorクリック開始処理
    ontouchesstart: function(e) {
        if (this.touchID > 0)return;
        this.touchID = e.ID;
        var sx = this.moveX = this.beforeX = e.pointing.x;
        var sy = this.moveY = this.beforeY = e.pointing.y;

        var p = this.checkScreenPanel(sx, sy);
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
            p.x = clamp(sx-this.offsetX, PN_OFFX, PN_OFFX+PN_W*(MAP_W-1));
            p.y = clamp(sy-this.offsetY, PN_OFFY, PN_OFFY+PN_H*(MAP_H-1));

            //選択中パネルの位置に他のパネルが合ったら場所を交換
            var mx = clamp(~~((p.x-PN_OFFX+PN_W_HALF)/PN_W), 0, MAP_W-1);
            var my = clamp(~~((p.y-PN_OFFY+PN_H_HALF)/PN_H), 0, MAP_H-1);
            if (p.mapX != mx || p.mapY != my) {
                var mp = this.checkMapPanel(mx, my);
                if (mp && !mp.disable) {
                    //行き先にパネルが無ければ移動
                    var fp = this.checkMapPanel(p.mapX, p.MapY);
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


