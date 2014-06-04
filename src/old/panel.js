/*
 *
 * PiyoPiyoBangBang
 *
 * panel.js
 * パネル管理クラス
 *
 */

tm.define("Panel", {
    superClass: "tm.display.Sprite",

    init: function() {
        //親クラスの初期化
        this.superInit("Panel", 60, 60);
        this.id = -1;
        this._pattern = 1;
        this.setFrameIndex(1, 60, 60);
        
        this.select = false;
        this.mapX = 0;    //5x5座標
        this.mapY = 0;
        this.mapX2 = 0;   //移動前
        this.mapY2 = 0;

        this.label = tm.display.Label("test");
        this.label.parent = this;
        this.label.setPosition(-20,-20);
        this.label.setAlign("center");
        this.label.fontSize = "10px";
        this.label.fillStyle = "rgba(0, 0, 0, 1.0)";
        this.label.update = function() {
            this.text = this.parent.mapX+" "+this.parent.mapY;
        }
        this.addChild(this.label);
    },
    pattern: {
        set:function(ptn) {
            this._pattern = ptn;
            this.setFrameIndex(ptn, 60, 60);
        },
        get:function() {
            return this._pattern;
        }
    },
    update: function() {
        this.mapX = ~~((this.x-40)/60);
        this.mapY = ~~((this.y-40)/60);
        if (this.mapX2 != this.mapX)this.mapX2 = this.mapX;
        if (this.mapY2 != this.mapY)this.mapY2 = this.mapY;
    },
    pick: function() {
        this.mapX = ~~((this.x-40)/60);
        this.mapY = ~~((this.y-40)/60);
        this.mapX2 = ~~((this.x-40)/60);
        this.mapY2 = ~~((this.y-40)/60);
        this.select = true;
        this.scale.x = 1.2;
        this.scale.y = 1.2;
    },
    drop: function() {
        this.select = false;
        this.scale.x = 1;
        this.scale.y = 1;
    },
});
