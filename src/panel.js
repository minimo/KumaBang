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
    
    //ステージ上パネル位置
    stageX: 0,
    stageY: 0,

    init: function() {
        //親クラスの初期化
        this.superInit("panel", PN_W, PN_H);
        this.id = -1;
        this.pattern = 1;
    },

    update: function() {
    },
    
    moveTo: function(stageX, stageY) {
        var dx = stageX*PN_W+PN_OffX;
        var dy = stageY*PN_H+PN_OffY;
        this.tweener.clear().to({x: dx, y: dy}, 200, "easeOutQuint");
    },

    pick: function() {
        this.select = true;
        this.setScale(1.1, 1.1);
    },

    drop: function() {
    },

    reverse: function() {
        var dx = this.stageX*PN_W+PN_OffX;
        var dy = this.stageY*PN_H+PN_OffY;
        this.tweener.clear().to({x: dx, y: dy, scaleX: 1, scaleY: 1}, 200, "easeOutQuint");
    },
});

kumabang.Panel.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

