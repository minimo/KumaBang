/*
 *  KumaBang.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace tiger
tmapp = {
    core: null,
};

tm.define("tmapp.CanvasApp", {
    superClass: tm.app.CanvasApp,

    bgm: null,

    init: function(id) {
        this.superInit(id);
        this.resize(SC_W, SC_H).fitWindow();
        this.fps = fps;
        this.background = "rgba(0, 0, 0, 0)";
        this.keyboard = tm.input.Keyboard(window);

        tmapp.core = this;

        //サウンドセット
        this.sounds = tm.extension.SoundSet();

        var loadingScene = tmapp.LoadingScene({
            assets: assets,
            width: SC_W,
            height: SC_H,
            bgColor: 'rgba(0, 0, 0, 1)',
            nextScene: function() {
                this._onLoadAssets();
                return tmapp.TitleScene();
            }.bind(this),
        });
        this.replaceScene(loadingScene);
    },

    _onLoadAssets: function() {
        this.sounds.readAsset();
        this.createSpriteSheet();

        //Admob setting
        if (ENABLE_PHONEGAP && USE_ADMOB && AdMob) {
            AdMob.createBanner({
                adId:admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER
            });
        }
    },

    exitApp: function() {
        this.stop();
    },

    //スプライトシート作成
    createSpriteSheet: function() {
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
                "miss": {
                    frames:[4,5],
                    frequency: 23,
                },
                "move": {
                    frames:[1,2,3],
                    next: "move",
                    frequency: 5,
                },
                "moveL": {
                    frames:[12,13,14,13],
                    next: "moveL",
                    frequency: 5,
                },
                "moveR": {
                    frames:[15,16,17,16],
                    next: "moveR",
                    frequency: 5,
                },
                "moveD": {
                    frames:[6,7,8,7],
                    next: "moveD",
                    frequency: 5,
                },
                "moveU": {
                    frames:[9,10,11,10],
                    next: "moveU",
                    frequency: 5,
                },
            },
        });
    },
    
    playBGM: function(asset) {
        this.sounds.playBGM(asset);
        return this;
    },

    stopBGM: function() {
        this.sounds.stopBGM();
        return this;
    },

    pauseBGM: function() {
        this.sounds.pauseBGM();
        return this;
    },

    resumeBGM: function() {
        this.sounds.resumeBGM();
        return this;
    },

    playSE: function(asset) {
        this.sounds.playSE(asset);
        return this;
    },

    setVolumeBGM: function(vol) {
        this.sounds.setVolumeBGM(vol);
        return this;
    },

    setVolumeSE: function(vol) {
        this.sounds.setVolumeSE(vol);
        return this;
    },
});

tmapp.CanvasApp.prototype.accessor("volumeBGM", {
    "get": function() { return this.sounds.volumeBGM; },
    "set": function(vol) {
        this.setVolumeBGM(vol);
    }
});
tmapp.CanvasApp.prototype.accessor("volumeSE", {
    "get": function() { return this.sounds.volumeSE; },
    "set": function(vol) {
        this.setVolumeSE(vol);
    }
});
