/*
 *  StageController.js
 *  2014/06/07
 *  @auther minimo  
 *  This Program is MIT license.
 */

//ステージ制御
tm.define("kumabang.StageController", {
	number: 0,
	needConditon: false,
	clearOK: true;
	map: [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
	],

	init: function() {
	},

	//クリア条件チェック
	checkCondition: function(scene) {
		return true;
	},
});
