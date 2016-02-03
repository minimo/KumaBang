/*
 *  main.js
 *  2015/09/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

//phina.globalize();

//定数
//デバッグフラグ
DEBUG = false;

//スクリーンサイズ
var SC_W = 320;
var SC_H = 640;

//マップパネル数
MAP_W = 5;
MAP_H = 5;

//パネルサイズ
PN_SIZE = 60;
PN_W = PN_SIZE;
PN_H = PN_SIZE;
PN_W_HALF = PN_W/2;
PN_H_HALF = PN_H/2;

//パネル位置オフセット    
PN_OFFX = 10+PN_W/2;
PN_OFFY = 60+PN_H/2;

window.onload = function() {
    var loader = phina.asset.AssetLoader();
    loader.load(assets["IPL"]).then(function() {
        app = phinaApp.Application({
            query: '#world',
            width: SC_W,
            height: SC_H,
        });
        app._onLoadAssets();
        app.replaceScene(phinaApp.MainScene());
        app.enableStats();
        app.run();
    });
};
