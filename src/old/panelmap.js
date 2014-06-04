/*
 *
 * PiyoPiyoBangBang
 *
 * panelmap.js
 * パネルマップ管理クラス
 *
 */

tm.define("PanelMap", {
    superClass: "tm.display.Sprite",

    init: function() {
        //親クラスの初期化
        this.superInit("Panel", 60, 60);
        this.id = -1;
        this._pattern = 1;
        this.setFrameIndex(1, 60, 60);
        
        this.select = false;
        this.mapX2 = 0;   //移動前
        this.mapY2 = 0;
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
    mapX: {
        set:function(val) {
            this.x = val*60+40;
        },
        get:function() {
            return ~~((this.x-40)/60);
        }
    },
    mapY: {
        set:function(val) {
            this.y = val*60+40;
        },
        get:function() {
            return ~~((this.y-40)/60);
        }
    },
    update: function() {
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
