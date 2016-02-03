/*
 *  Panel.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("phinaApp.Panel", {
    superClass: "phina.display.Sprite",

    _member: {
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

        //ラベル用パラメータ
        labelParam: {
            fill: "white",
            stroke: true,
            strokeColor: 'black',
            strokeWidth: 3,

            fontFamily: "KS-Kohichi",
            align: "center",
            baseline: "middle",
            fontSize: 20
        },
    },

    init: function() {
        //親クラスの初期化
        this.superInit("panel", PN_W, PN_H);
        this.$extend(this._member);

        this.id = -1;
        this.pattern = 1;
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
            app.playSE("drop");
        } else {
            //十字パネルの場合
            var dummy = phina.display.Sprite("panel", PN_W, PN_H).addChildTo(this);
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

        var lb = phina.display.Label("1000", this.labelParam)
            .addChildTo(this.scene)
            .setPosition(this.x, this.y);
        lb.tweener.moveBy(0,-30, 1500,"easeOutQuad").fadeOut(500).call(function(){lb.remove();});
    },

    _accessor: {
        pattern: {
            "get": function() { return this._pattern; },
            "set": function(ptn) {
                this._pattern = ptn;
                this.setFrameIndex(ptn);
            }
        },
    }
});
