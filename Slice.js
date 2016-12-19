
function Slice(cx, cy, r, pos, len,col,ctx,isparent,data) {
  this.isparent = isparent
  this.ctx = ctx
  this.data = data
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
    // Show tolltip
    this.displayData()
  }

  if (this.isparent) {
    this.showLine()
  }
}

Slice.prototype.showLine = function(){
    var w = 600
    var h = 600

    var angle = (this.start+this.end)/2
    var centerSliceX = this.cx  + this.radius * Math.cos(angle)
    var centerSliceY = this.cy + this.radius * Math.sin(angle)
    var pos = getSteps(angle)

    // Line
    this.ctx.beginPath();
    this.ctx.moveTo(centerSliceX+(pos.x*4),centerSliceY+(pos.y*4));
    this.ctx.lineTo(centerSliceX+(pos.x*10),centerSliceY+(pos.y*10));

    this.ctx.font = '10pt Calibri';
    var text = this.data
    var textpos = this.ctx.measureText(text)
    this.ctx.fillStyle = 'blue';
    this.ctx.textAlign = 'center';
    
    if (centerSliceX > w/2) {
      this.ctx.lineTo(centerSliceX+(pos.x*10)+20,centerSliceY+(pos.y*10));
      this.ctx.fillText(text ,centerSliceX+(pos.x*10)+30,centerSliceY+(pos.y*10)+4);
    }
    if (centerSliceX < w/2) {
      this.ctx.lineTo(centerSliceX+(pos.x*10)-20,centerSliceY+(pos.y*10));
      this.ctx.fillText(text ,centerSliceX+(pos.x*10)-20-textpos.width,centerSliceY+(pos.y*10)+4);
    }

    this.ctx.stroke();
    
    
};

function getSteps(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    return {
        x: cos,
        y: sin ,
    }
}

Slice.prototype.update = function() {

}