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

    //パネル位置オフセット    
    panelOffsetX: 0,
    panelOffsetY: 0,

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


