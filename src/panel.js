/*
 *  Panel.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("kumabang.Panel", {
    superClass: "tm.display.Sprite",

    //選択中フラグ
    select: false,
    
    //選択＆移動不可フラグ
    disable: false,
    shuffle: true,  //シャッフル可能フラグ

    //状態フラグ
    onPlayer: false,
    onItem: false,
    
    //マップ上パネル位置
    mapX: 0,
    mapY: 0,

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
            lb.fontFamily = "'KS-Kohichi-FeltPen'";
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
        if (this.onPlayer || this.onItem) {
            this.disable = true;
        } else {
            this.disable = false;
        }
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
        this.tweener.clear().to({x: this.x, y: this.y+50, scaleX: 0.5, scaleY: 0.5, alpha: 0}, 100, "easeOutQuint");
    },
});

kumabang.Panel.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

