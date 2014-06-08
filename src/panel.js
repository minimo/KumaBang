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
            lb.fontFamily = "'Orbitron'";
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
    
    move: function(x, y) {
        this.moveTo(this.mapX, this.mapY);
    },

    moveTo: function(x, y) {
        var dx = x*PN_W+PN_OffX;
        var dy = y*PN_H+PN_OffY;
        this.tweener.clear().to({x: dx, y: dy}, 100, "easeOutQuint");
    },

    reverse: function() {
        var dx = this.mapX*PN_W+PN_OffX;
        var dy = this.mapY*PN_H+PN_OffY;
        this.tweener.clear().to({x: dx, y: dy, scaleX: 1, scaleY: 1}, 100, "easeOutQuint");
    },
});

kumabang.Panel.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

