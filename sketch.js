
var config = {
	canvas: "mycanvas",
	cw: window.innerWidth,
	ch: window.innerHeight,
	donutWith:50,
	radius:200,
	values : [
		{
			max:4,
			current:3,
			maxColor:'#111111',
			currentColor:'#ffffff'
		},
		{
			max:10,
			current:5,
			maxColor:'#3E6185',
			currentColor:'#cccccc'
		},
		{
			max:20,
			current:5,
			maxColor:'#B1D298',
			currentColor:'#2C6981'
		}
	]
}

function Chart(userConfig) {
	// @TODO : Extend 
	this.config = config
	this.config.values = userConfig
	this.init()
}

// For performance
Chart.prototype.canvas;
Chart.prototype.ctx;
Chart.prototype.width;
Chart.prototype.height;
Chart.prototype.total;
Chart.prototype.slices = [];


Chart.prototype.init = function(){
	var c = this.config;
	this.canvas = document.getElementById(c.canvas);
	this.ctx = this.canvas.getContext('2d')
	this.canvas.width = c.cw;
	this.canvas.height = c.ch;
	this.width = c.cw
	this.height = c.ch
	this.setValues()
	this.attachListener()
};

Chart.prototype.setValues = function(){
	var c = this.config
	var total = getTotal(c.values)
	var lastAngle = 0;
	var cx = this.width/2
	var cy = this.height/2

	for (var i = 0; i < c.values.length; i++) {
  		var end = lastAngle+radians(c.values[i].max/total)
		this.slices.push(new Slice(cx, cy, c.radius+c.donutWith, lastAngle, end, c.values[i].maxColor,this.ctx))
		this.slices.push(new Slice(cx, cy, c.values[i].current/c.values[i].max*c.radius+c.donutWith, lastAngle, end, c.values[i].currentColor,this.ctx))
	    lastAngle += radians(c.values[i].max/total);
	}	
};


Chart.prototype.attachListener = function(){
	var self = this
	this.canvas.addEventListener("mousemove", function(e) {
	  var x = e.clientX;
	  var y = e.clientY;
	  self.slices.forEach(function(slice) {
	    slice.render(function () {
		    if (self.ctx.isPointInPath(x, y)) {
		      slice.highlighted = true;
		      slice.displayData();
		    } else {
		      slice.highlighted = false;
		    }
		    // self.ctx.closePath();
	    })

	  });
	});
};

Chart.prototype.render = function(){

	this.ctx.clearRect(0, 0, this.width, this.height);

	this.slices.forEach(function(p) {
		p.render();
	});
    
    this.ctx.beginPath();
    this.ctx.arc(this.width/2, this.height/2, this.config.donutWith, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
	this.ctx.closePath();

    _requestAnimationFrame(this.render.bind(this));
};


Chart.prototype.update = function(){
};

