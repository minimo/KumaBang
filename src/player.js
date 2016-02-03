/*
 *  player.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

//プレイヤーキャラクター管理クラス
phina.define("phinaApp.Player", {
    superClass: "phina.display.Sprite",

    _member: {
        //プレイヤーの現在マップ座標    
        mapX: -1,
        mapY: -1,

        //乗っているパネル
        onPanel: null,

        //状態フラグ
        special: false,  //特殊アクション中
    },

    init: function() {
        //親クラスの初期化
        this.superInit("player");
        this.$extend(this._member);

        this.origin.y = 0.9;

        this.anim = phina.accessory.FrameAnimation("player").attachTo(this);
        this.anim.gotoAndPlay("stop");
    },

    update: function() {
        //基本アクション
        if (!this.special) {
            //移動してたらアニメーションする
            if (this.bx != this.x) {
                if (this.nowAnimation !== "moveL") this.anim.gotoAndPlay("moveL");
                this.nowAnimation = "moveL";
            } else if (this.by != this.y) {
                if (this.by-this.y > 0) {
                    if (this.nowAnimation !== "moveU") this.anim.gotoAndPlay("moveU");
                    this.nowAnimation = "moveU";
                } else {
                    if (this.nowAnimation !== "moveD") this.anim.gotoAndPlay("moveD");
                    this.nowAnimation = "moveD";
                }
            } else {
                this.nowAnimation = "stop";
                this.anim.gotoAndPlay("stop");
            }
        }

        //左右の向き
        if (this.bx != this.x) {
            if (this.bx > this.x) {
                this.setScale(1, 1);
            } else {
                this.setScale(-1, 1);
            }
        }
        this.bx = this.x;
        this.by = this.y;
        this.time++;
    },
    
    startup: function() {
        this.visible = false;
        this.special = false;
        this.anim.gotoAndPlay("stop");
        this.nowAnimation = "stop";
        this.mapX = -1;
        this.mapY = -1;
    },

    //特殊アクション
    action: function(name) {
        this.nowAnimation = name;
        this.anim.gotoAndPlay(name);
        switch (name) {
            case "goal":
                var that = this;
                this.tweener.call(function(){that.special = true; that.anim.gotoAndPlay("move"); that.nowAnimation = "move";});
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                break;
            case "miss":
                this.special = true;
                this.anim.gotoAndPlay("miss");
                this.nowAnimation = "miss";
                this.tweener.clear().moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20, 150,"easeOutQuint");
                break
        }
    },
});

//開始時プレイヤーキャラクター
phina.define("phinaApp.Egg", {
    superClass: "phina.display.Sprite",

    finished: false,

    init: function() {
        //親クラスの初期化
        this.superInit("egg");
        this.origin.y = 0.9;

        this.anim = phina.accessory.FrameAnimation("egg").attachTo(this);
        this.anim.gotoAndPlay("enter");
    },
    update: function() {
        if (this.anim.paused) {
            this.remove();
            this.finished = true;
            this.player.visible = true;
        }
    },
    
    startup: function() {
        this.tweener.clear().wait(300).from({x: 0, y: -20},200,"easeOutQuint").from({x: 0, y: 20},150,"easeOutQuint");
    }
});
