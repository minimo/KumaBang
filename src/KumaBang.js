/*
 *  KumaBang.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace tiger
kumabang = {
    core: null,
};

tm.define("kumabang.CanvasApp", {
    superClass: tm.app.CanvasApp,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = fps;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        kumabang.core = this;
        
        var loadingScene = tm.ui["LoadingScene"]({
            assets: assets,
            width: SC_W,
            height: SC_H,
            nextScene: function() {
                this._onLoadAssets();
                return kumabang.MainScene();
            }.bind(this),
        });
        loadingScene.bg.canvas.clearColor("black");
        this.replaceScene(loadingScene);
  },

    _onLoadAssets: function() {
    },

    exitApp: function() {
        this.stop();
    },
});

//スプライトシート
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
                frames:[1,2,3,1,2,3,1,2,3],
                next: "stop",
                frequency: 5,
            },
            "move": {
                frames:[1,2,3],
                next: "move",
                frequency: 5,
            },
        },
    });
    
};
