/*
 *  StageData.js
 *  2014/06/09
 *  @auther minimo  
 *  This Program is MIT license.
 */
//アイテムデータ意味
//1:りんご
//2:スター
//3:時計
//4:ライフ
//5:爆弾
//6:空白（シャッフル不可パネル）
//7:空白（移動不可パネル）
//8:スタート位置
//9:ゴール位置

kumabang.stageData = [];

//ステージ１
tm.define("kumabang.Stage1", {
	number: 0,              //ステージ番号
	needConditon: false,    //クリア条件有りフラグ
	clearOK: true,          //条件を満たしているか

	//マップ初期位置配列
	map: [
        [8,1,5,4,5],
        [4,1,7,2,2],
        [6,5,4,7,2],
        [4,7,6,5,2],
        [6,1,1,7,15],
	],

	//アイテム初期位置配列
	item: [
        [8,6,6,0,0],
        [6,6,6,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,9],
	],

    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
kumabang.stageData[0] = kumabang.Stage1();


