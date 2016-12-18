
function Slice(cx, cy, r, pos, len,col,ctx) {
  this.ctx = ctx
  // this.data = data
  this.cx = cx;
  this.cy = cy;
  this.radius = r;
  this.start = pos;
  this.end = len;
  this.color = col;
  this.highlightedColor = shadeColor(this.color, .6);
  this.highlighted = false;
  this.popped = false;
  this.animationFrame = 0;

}

Slice.prototype.displayData = function(){
    var px = this.cx  + this.radius * Math.cos((this.start+this.end)/2)
    var py = this.cy + this.radius * Math.sin((this.start+this.end)/2)
    this.ctx.beginPath();
    this.ctx.arc(px, py, 10, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
}

Slice.prototype.render = function(cb) {
  if (!this.highlighted) {
    this.ctx.fillStyle = this.color;
  } else {
    this.ctx.fillStyle = this.highlightedColor;
  }
  // this.ctx.strokeStyle = this.color;
  this.ctx.beginPath();
  this.ctx.moveTo(this.cx, this.cy );
  this.ctx.lineTo(this.cx, this.cy);
  this.ctx.arc(this.cx, this.cy , this.radius, this.start, this.end);
  this.ctx.fill();
  // this.ctx.stroke();
  this.ctx.closePath();
  
  if (cb) cb()
  if (this.highlighted) {
    this.displayData()
  }

  this.showLine()
}

Slice.prototype.showLine = function(){
    var px = this.cx  + this.radius * Math.cos((this.start+this.end)/2)
    var py = this.cy + this.radius * Math.sin((this.start+this.end)/2)
    this.ctx.beginPath();
    
    this.ctx.moveTo(px-20, py-20);
    this.ctx.lineTo(px, py);
    this.ctx.stroke();
};

Slice.prototype.update = function() {

}