/*
 *  StageData.js
 *  2014/06/09
 *  @auther minimo  
 *  This Program is MIT license.
 */

//アイテムデータ意味
//-1:シャッフル不可パネル
// 1:得点アイテム１
// 2:得点アイテム２
// 3:得点アイテム３
// 4:得点アイテム４
// 5:得点アイテム５
// 6:スター
// 7:時計
// 8:ライフ
// 9:爆弾

phinaApp.numStage = 0;
phinaApp.stageData = [];

//ステージ１
phina.define("phinaApp.Stage1", {
	number: 1,              //ステージ番号
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
        [-1,-1,-1, 0, 0],
        [-1,-1,-1, 0, 0],
        [ 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0,-1],
	],
	
    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
phinaApp.stageData[phinaApp.numStage] = phinaApp.Stage1();
phinaApp.numStage++;

//ステージ２
phina.define("phinaApp.Stage2", {
	number: 2,              //ステージ番号
	needConditon: false,    //クリア条件有りフラグ
	clearOK: true,          //条件を満たしているか

	//マップ初期位置配列
	map: [
        [9,4,5,4,5],
        [6,3,7,2,2],
        [4,7,4,7,2],
        [2,4,3,5,2],
        [6,7,6,7,15]
	],

	//アイテム初期位置配列
	item: [
        [-1,-1,-1, 0, 0],
        [-1, 1,-1, 0, 0],
        [ 0,-1, 0, 0, 0],
        [ 0, 0,-1, 0, 0],
        [ 0, 0, 0, 0,-1],
	],

    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
phinaApp.stageData[phinaApp.numStage] = phinaApp.Stage2();
phinaApp.numStage++;

//ステージ３
phina.define("phinaApp.Stage3", {
	number: 3,              //ステージ番号
	needConditon: false,    //クリア条件有りフラグ
	clearOK: true,          //条件を満たしているか

	//マップ初期位置配列
	map: [
        [4,1,1,1,5],
        [2,4,1,5,2],
        [2,6,1,3,7],
        [2,4,5,6,5],
        [11,15,6,1,7],
	],

	//アイテム初期位置配列
	item: [
        [-1, 0, 0, 0, 0],
        [-1, 0, 0, 2, 0],
        [-1, 0, 0, 0, 0],
        [-1,-1,-1, 0, 0],
        [-1,-1, 6, 0, 0],
	],

    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
phinaApp.stageData[phinaApp.numStage] = phinaApp.Stage3();
phinaApp.numStage++;

//ステージ４
phina.define("phinaApp.Stage4", {
	number: 4,              //ステージ番号
	needConditon: false,    //クリア条件有りフラグ
	clearOK: true,          //条件を満たしているか

	//マップ初期位置配列
	map: [
        [4,5,9,4,5],
        [2,2,6,7,2],
        [6,3,5,4,7],
        [4,3,3,3,5],
        [6,7,15,6,7],
	],

	//アイテム初期位置配列
	item: [
        [ 0, 0,-1,-1,-1],
        [ 0, 0, 0,-1,-1],
        [ 0, 1,-1, 1, 0],
        [ 0, 0, 0, 0, 0],
        [ 0, 0,-1, 0, 0],
	],

    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
phinaApp.stageData[phinaApp.numStage] = phinaApp.Stage4();
phinaApp.numStage++;

//ステージ５
phina.define("phinaApp.Stage5", {
	number: 5,              //ステージ番号
	needConditon: false,    //クリア条件有りフラグ
	clearOK: true,          //条件を満たしているか

	//マップ初期位置配列
	map: [
        [13,4,5,4,5],
        [2,2,6,3,7],
        [4,7,3,6,5],
        [6,7,4,1,7],
        [6,5,6,1,10],
	],

	//アイテム初期位置配列
	item: [
        [-1, 0, 0,-1, 1],
        [ 0, 0, 0, 0,-1],
        [ 2, 0, 5, 0, 0],
        [-1, 0, 0, 0, 0],
        [ 1,-1, 0,-1,-1],
	],

    //初期化
	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
phinaApp.stageData[phinaApp.numStage] = phinaApp.Stage5();
phinaApp.numStage++;
