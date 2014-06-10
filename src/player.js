/*
 *  player.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

//プレイヤーキャラクター管理クラス
tm.define("kumabang.Player", {
    superClass: "tm.display.AnimationSprite",

    init: function() {
        //親クラスの初期化
        this.superInit(player, 32, 32);
        this.origin.y = 0.9;
    },
    update: function() {
        //移動してたらアニメーションする        
        if (this.bx != this.x || this.by != this.y) {
            if (this.nowAnimation !== "move") this.gotoAndPlay("move");
            this.nowAnimation = "move";
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
    
    //特殊アクション
    action: function(name) {
        this.nowAnimation = name;
        this.gotoAndPlay(name);
        switch (name) {
            case "startup":
                this.tweener.clear().moveBy(0,-20,200,"easeOutQuint").moveBy(0,20,150,"easeOutQuint");
                break;
        }
    },
});

//開始時プレイヤーキャラクター
tm.define("kumabang.Egg", {
    superClass: "tm.display.AnimationSprite",

    finished: false,

    init: function() {
        //親クラスの初期化
        this.superInit(egg, 32, 32);
        this.origin.y = 0.9;
    },
    update: function() {
        if (this.paused) {
            this.remove();
            this.finished = true;

            this.player.visible = true;
            this.player.action("startup");
        }
    }
});

//スプライトシート作成
kumabang.createSpriteSheet = function() {
    egg = tm.asset.SpriteSheet({
        image: "enter",
        frame: {
            width: 32,
            height: 32,
            count: 15,
        },
        animations: {
            "stop": {
                frames:[14],
                next: "stop",
                frequency: 1,
            },
            "enter": {
                frames:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
                frequency: 3,
            },
        },
    });

    player = tm.asset.SpriteSheet({
        image: "player",
        frame: {
            width: 32,
            height: 32,
            count: 18,
        },
        animations: {
            "stop": {
                frames:[0],
                next: "stop",
                frequency: 1,
            },
            "startup": {
                frames:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3],
                next: "stop",
                frequency: 5,
            },
            "moveLR": {
                frames:[1,2,3],
                next: "move",
                frequency: 5,
            },
            "moveL": {
                frames:[12,13,14],
                next: "move",
                frequency: 5,
            },
            "moveR": {
                frames:[15,16,17],
                next: "move",
                frequency: 5,
            },
            "moveD": {
                frames:[6,7,8],
                next: "move",
                frequency: 5,
            },
            "moveU": {
                frames:[9,10,11],
                next: "move",
                frequency: 5,
            },
        },
    });
    
};
