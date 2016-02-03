/*
 *  tmlib.custom.js
 *  2015/03/12
 *  @auther minimo  
 *  This Program is MIT license.
 */

//phina.display.Sprite拡張
//トリミング開始位置設定
phina.display.Sprite.prototype.setFrameTrimming = function(x, y, width, height) {
    this.frameTrimX = x || 0;
    this.frameTrimY = y || 0;
    this.frameTrimW = width || this.image.domElement.width - this.frameTrimX;
    this.frameTrimH = height || this.image.domElement.height - this.frameTrimY;
    return this;
}
phina.display.Sprite.prototype.setFrameIndex = function(index, width, height) {

    //テクスチャのトリミング設定
    var sx = this.frameTrimX || 0;
    var sy = this.frameTrimY || 0;
    var sw = this.frameTrimW || (this.image.domElement.width-sx);
    var sh = this.frameTrimH || (this.image.domElement.height-sy);

    var tw  = width || this.width;
    var th  = height || this.height;
    var row = ~~(sw / tw);
    var col = ~~(sh / th);
    var maxIndex = row*col;
    index = index%maxIndex;

    var x   = index%row;
    var y   = ~~(index/row);
    this.srcRect.x = sx+x*tw;
    this.srcRect.y = sy+y*th;
    this.srcRect.width  = tw;
    this.srcRect.height = th;

    this._frameIndex = index;

    return this;
}
