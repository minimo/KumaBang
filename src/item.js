/*
 *  item.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

tm.define("kumabang.Item", {
    superClass: "tm.display.Sprite",

    //アイテム種別
    _pattern: 0,
    
    //マップ上位置
    mapX: 0,
    mapY: 0,

    //所属パネル
    panel: null,

    init: function() {
        //親クラスの初期化
        this.superInit("item", PN_W, PN_H);
    },

    update: function() {
    },
    
});

kumabang.Item.prototype.accessor("pattern", {
    "get": function() { return this._pattern; },
    "set": function(ptn) {
        this._pattern = ptn;
        this.setFrameIndex(ptn, 60, 60);
    }
});

