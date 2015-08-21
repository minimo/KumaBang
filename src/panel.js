/*
 *  Panel.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("tmapp.Panel", {
    superClass: "tm.display.Sprite",

    //選択中フラグ
    select: false,
    
    //選択＆移動不可フラグ
    disable: false,
    shuffle: true,  //シャッフル可能フラグ

    //状態フラグ
    onPlayer: false,
    onItem: false,
    onPlayerBefore: false,
    dropped: false,
    
    //マップ上パネル位置
    mapX: 0,
    mapY: 0,

    //プレイヤー進入方向
    inX: 0,
    inY: 0,

    //所属シーン
    scene: null,

    init: function() {
        //親クラスの初期化
        this.superInit("panel", PN_W, PN_H);
        this.id = -1;
        this.pattern = 1;
        
        //デバッグ用
        if (DEBUG) {
            var that = this;
            var lb = this.rateLabel = tm.display.OutlineLabel("50%", 30).addChildTo(this);
            lb.x = 0;
            lb.y = 0;
            lb.fontFamily = "KS-Kohichi";
            lb.align     = "center";
            lb.baseline  = "middle";
            lb.fontSize = 20;
            lb.fontWeight = 700;
            lb.outlineWidth = 2;
            lb.update = function() {
                this.text = that.mapX+":"+that.mapY;
            };
        }
    },

    update: function() {
        //選択出来ない状況判定
        if (this.onPlayer || this.onItem || this.dropped) {
            this.disable = true;
        } else {
            this.disable = false;
        }

        //特殊パネルは選択不可        
        if (7 < this._pattern && this._pattern < 16) this.disable = true;

        if (this.onPlayerBefore && !this.onPlayer) {
            this.drop();
        }

        this.onPlayerBefore = this.onPlayer;
    },
    
    //指定マップ座標へ移動
    move: function(x, y) {
        this.mapX = x;
        this.mapY = y;
        var dx = x*PN_W+PN_OFFX;
        var dy = y*PN_H+PN_OFFY;
        this.tweener.clear().to({x: dx, y: dy}, 100, "easeOutQuint");
    },

    //パネルを定位置へ戻す
    reverse: function() {
        var dx = this.mapX*PN_W+PN_OFFX;
        var dy = this.mapY*PN_H+PN_OFFY;
        this.tweener.clear().to({x: dx, y: dy, scaleX: 1, scaleY: 1}, 100, "easeOutQuint");
    },

    //パネルを落とす
    drop: function() {
        if (this._pattern != 3) {
            this.dropped = true;
            this.tweener.clear().to({x: this.x, y: this.y+20, scaleX: 0.5, scaleY: 0.5, alpha: 0}, 2000, "easeOutQuint");
            tm.asset.AssetManager.get("drop").clone().play();
        } else {
            //十字パネルの場合
            var dummy = tm.display.Sprite("panel", PN_W, PN_H).addChildTo(this);
            dummy.setFrameIndex(3, PN_W, PN_H);
            dummy.tweener.fadeOut(500).call(function(){dummy.remove();});
            if (this.inX != 0) {
                this.pattern = 2;
            } else {
                this.pattern = 1;
            }
        }
        this.scene.score += 1000;
        this.scene.passPanel++;
        this.scene.passPanelTotal++;

        var lb = tm.display.OutlineLabel("1000", 30).addChildTo(this.scene);
        lb.setPosition(this.x, this.y);
        lb.fontFamily = "KS-Kohichi";
        lb.align     = "center";
        lb.baseline  = "middle";
        lb.fontSize = 20;
        lb.outlineWidth = 2;
        lb.tweener.moveBy(0,-30, 1500,"easeOutQuad").fadeOut(500).call(function(){lb.remove();});
    },
});

tmapp.Panel.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

