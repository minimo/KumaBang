/*
 *  Panel.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("kumabang.Panel", {
    superClass: "tm.display.Sprite",

    init: function() {
        //親クラスの初期化
        this.superInit("panel", PN_W, PN_H);
        this.id = -1;
        this.pattern = 1;
    },
    update: function() {
    },
    pick: function() {
    },
    drop: function() {
    },
});

kumabang.Panel.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

