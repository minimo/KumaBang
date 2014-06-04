/*
 *
 * PiyoPiyoBangBang
 *
 * player.js
 * プレイヤー管理クラス
 *
 */

//プレイヤーキャラクター管理クラス
tm.define("Player", {
    superClass: "tm.display.AnimationSprite",

    init: function() {
        //親クラスの初期化
        this.superInit(hiyokoSS, 32, 32);
    },
    update: function() {
        //移動してたらアニメーションする        
        if (this.bx != this.x || this.by != this.y) {
            if (this.nowAnimation !== "move") this.gotoAndPlay("move");
            this.nowAnimation = "move";
//            if (this.currentAnimation.next.indexOf("move", 0) === -1) this.gotoAndPlay("move");
        } else {
            this.nowAnimation = "stop";
            this.gotoAndPlay("stop");
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
});

