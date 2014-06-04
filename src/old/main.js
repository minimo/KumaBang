/*
 *
 * PiyoPiyoBangBang
 *
 * main.js
 *
 */


var SCREEN_WIDTH    = 320;
var SCREEN_HEIGHT   = 320;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;

var rand = function(max) {return ~~(Math.random() * max);}

//アセット一覧
var ASSETS = {
    "hiyoko": "assets/hiyoco_nomal_full.png",
    "Panel": "assets/panel.png",
    "Panel2": "assets/panel2.png"
};

//Canvasインスタンス
var app;

tm.main(function() {
    //Canvasインスタンス生成
    app = tm.app.CanvasApp("#world");
    //リサイズ
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //バックグラウンドカラー
    app.background = "rgba(0, 0, 0, 1.0)";
    //自動リサイズ
    app.fitWindow();

    //アセット読み込みシーン
    var loading = tm.app.LoadingScene({
        assets: ASSETS,          //アセット一覧
        nextScene: MainScene,    //読み込み後に移行するシーン
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    });

    //シーンの移行
    app.replaceScene(loading);
    
    //ゲームの実行
    app.run();
});

//メインシーン
tm.define("MainScene", {
    superClass: "tm.app.Scene",
    
    init: function() {
        //親クラスの初期化
        this.superInit();

        //マップ

        //スプライトシート
        hiyokoSS = tm.asset.SpriteSheet({
            image: "hiyoko",
            frame: {
                width: 32,
                height: 32,
                count: 18
            },
            animations: {
                "stop": {
                    frames:[0],
                    next: "stop",
                    frequency: 1,
                },
                "move": {
                    frames:[1,2,3],
                    next: "move",
                    frequency: 5,
                },
            },
        });

        //表示レイヤ
        this.layerMaplower = tm.app.Object2D().addChildTo(this);
        this.layerMap = tm.app.Object2D().addChildTo(this);
        this.layerMapUpper = tm.app.Object2D().addChildTo(this);
        this.layerCharcter = tm.app.Object2D().addChildTo(this);
        this.layerItem = tm.app.Object2D().addChildTo(this);
 
        //プレイヤーキャラクタ
        this.player = Player();
        this.player.setPosition(160, 200);
        this.player.gotoAndPlay("move");
//        this.addChild(this.player);

        this.panels = [];
        var i = 0;
        for (var y = 0; y < 5; y++) {
            for (var x = 0; x < 5; x++) {
                var p = this.panels[i] = Panel();
                p.id = i;
                p.x = x*60+40;
                p.y = y*60+40;
                this.layerMap.addChild(p);
                i++;
            }
        }

        this.selectPanel = null;
        this.offsetX = this.offsetY = 0;
    },
    time: 0,
    update: function(app) {
        var p = app.pointing;

        if (p.getPointing()) {
            if (this.selectPanel == null) {
                //パネルを選択した
                var x = p.x, y = p.y;
                for (var i = 0, len = this.panels.length; i < len; i++) {
                    var pl = this.panels[i];
                    var px = pl.x, py = pl.y;
                    if (px-30<x &&  x<px+30 && py-30<y && y<py+30)this.selectPanel = pl;
                }
                if (this.selectPanel) {
                    this.offsetX = this.selectPanel.x-p.position.x;
                    this.offsetY = this.selectPanel.y-p.position.y;
                    this.selectPanel.pick();
                    this.selectPanel.remove();
                    this.layerMapUpper.addChild(this.selectPanel);
                }
            } else {
                //パネルをドラッグ中
                var pl = this.selectPanel;
                pl.x = p.position.x+this.offsetX;
                pl.y = p.position.y+this.offsetY;
                var mx1 = ~~((pl.x)/60);
                var my1 = ~~((pl.y)/60);
                //重複パネル検出
                for (var i = 0, len = this.panels.length; i < len; i++) {
                    if (this.selectPanel.id == i) continue;
                    var pl2 = this.panels[i];
                    var mx2 = ~~((pl2.x)/60);
                    var my2 = ~~((pl2.y)/60);
                    //ドラッグ中のパネルと重複
                    if (mx1 == mx2 && my1 == my2) {
                        pl2.x = pl.mapX2*60+40;
                        pl2.y = pl.mapY2*60+40;
                    }
                }
            }
        }

        if (!p.getPointing()) {
            //パネルのリリース
            if (this.selectPanel) {
                var pl = this.selectPanel;
                pl.x = ~~(pl.x/60)*60+40;
                pl.y = ~~(pl.y/60)*60+40;
                this.selectPanel.drop();
                this.selectPanel.remove();
                this.layerMap.addChild(this.selectPanel);
                this.selectPanel = null;
            } else {
            }
        }

        this.time++;
    },
});
