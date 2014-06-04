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
SC_W = 320;
SC_H = 320;

//パネルサイズ
PN_W = 60;
PN_H = 60;


//フレームレート
fps = 30;

var toRad = 3.14159/180;    //弧度法toラジアン変換
var toDeg = 180/3.14159;    //ラジアンto弧度法変換
var sec = function(s) { return ~~(fps * s);}    //秒からフレーム数へ変換
var rand = function(min, max) { return mt.nextInt(min, max); };    //乱数発生

//数値の制限
var clamp = function(x, min, max) {
    return (x<min)?min:((x>max)?max:x);
};

//インスタンス
app = {};

//アプリケーションメイン
tm.main(function() {
    app = kumabang.CanvasApp("#world");
    app.run();
});
