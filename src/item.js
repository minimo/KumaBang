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
        pattern = pattern | 1;
        
        this.panel = panel;

        //アイテムスプライト
        this.sprite = tm.display.Sprite("item", 32, 32).addChildTo(this);
        this.sprite.x = this.panel.x;
        this.sprite.y = this.panel.y-SC_H*0.7;
//        this.sprite.setScale(0.5);
        var that = this;
        this.sprite.tweener.clear().move(this.panel.x, this.panel.y-20, 1000, "easeOutBounce").call(function(){that.ok = true;});

        switch (pattern) {
            case 1: //りんご
                this.pattern = 0;
                break;
            case 2: //さくらんぼ
                this.pattern = 20;
                break;
            case 3: //メロン
                this.pattern = 5;
                break;
            case 4: //イチゴ
                this.pattern = 7;
                break;
            case 5: //ぶどう
                this.pattern = 19;
                break;
            case 6:
                this.pattern = 5;
                break;
            case 7:
                this.pattern = 6;
                break;
            case 8:
                this.pattern = 7;
                break;
        }
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

