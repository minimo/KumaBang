/*
 *  item.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("kumabang.Item", {
    superClass: "tm.app.Object2D",

    //アイテム種別
    _pattern: 0,
    
    //所属パネル
    panel: null,

    ok: false,
    rad: 0, 

    time: 0,

    init: function(panel, pattern) {
        //親クラスの初期化
        this.superInit();
        
        this.panel = panel;

        //アイテムスプライト
        this.sprite = tm.display.Sprite("item", 32, 32).addChildTo(this);
        this.sprite.y = this.panel.y-SC_H*0.7;
        this.sprite.setScale(0.5);
        var that = this;
        this.sprite.tweener.clear().move(this.panel.x, this.panel.y-20, 1000, "easeOutBounce").call(function(){that.ok = true;});
        this.pattern = pattern;

/*
        //影
        this.shadow = tm.display.Sprite().addChildTo(this);
        this.shadow.image = tm.graphics.Canvas()
        .setStrokeStyle("rgba(0,0,0,0.5)")
        .setFillStyle(tm.graphics.RadialGradient(50, 50, 0, 50, 50, 50)
            .addColorStopList([
                { offset: 0.00, color: "rgba(0,0,0,0.8)" },
                { offset: 1.00, color: "rgba(0,0,0,0.8)" },
            ]).toStyle())
        .fillCircle(80, 80, 16);
*/
    },

    update: function() {
        if (this.ok && this.time % 2 == 0) {
            this.sprite.y = Math.sin(this.rad*0.1)*-10+this.panel.y-20;
            this.rad+=1;
        }
        this.time++;
    },
});

kumabang.Item.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.sprite.setFrameIndex(ptn, 32, 32);
    }
});

