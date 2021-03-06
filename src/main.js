/*
 *  main.js
 *  2014/06/04
 *  @auther minimo  
 *  This Program is MIT license.
 */
 
//乱数発生器
mt = new MersenneTwister();

//定数
//デバッグフラグ
DEBUG = false;

//スクリーンサイズ
SC_W = 640/2;
SC_H = 1136/2;

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


//フレームレート
fps = 30;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(fps * s);}    //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生

//距離計算
var distance = function(from, to) {
    var x = from.x-to.x;
    var y = from.y - to.y;
    return Math.sqrt(x*x+y*y);
}

//距離計算（ルート無し版）
var distanceSq = function(from, to) {
    var x = from.x-to.x;
    var y = from.y - to.y;
    return x*x+y*y;
}

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = tmapp.CanvasApp("#world");
    app.run();
});

