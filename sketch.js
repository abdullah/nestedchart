(function () {
	
	/** @type {Object} Default Config */
	var defconfig = {
		canvas: "mycanvas",
		cw: 800,
		ch: 800,
		fontSize: 11,
		labelLineWidth: 10,
		labelLineHeight: 4,
		labelLineOffset: 4,
		labelStrokeWeight: 1,
		labelColor: "#111111",
		outSideLineWidth: 10,
		donutWith:100,
		radius:100,
		values : [],
		onhover:function () {}
	}

	/** Global Context of Canvas  and config*/
	var ctx;
	var _config;

	/**
	 * Constructor
	 * @param {Object} userConfig User config
	 */
	function Chart(userConfig) {
		// @TODO : Extend 
		console.log(this)
		this.config = mergeOptions(defconfig,userConfig)
		_config = mergeOptions(defconfig,userConfig)
		this.init()
	}

	// For performance
	Chart.prototype.canvas;
	Chart.prototype.width;
	Chart.prototype.height;
	Chart.prototype.mouseX;
	Chart.prototype.mouseY;
	Chart.prototype.total;
	Chart.prototype.config={};
	Chart.prototype.slices = [];

	/**
	 * Inıtılaze Chart
	 * @return {Void} 
	 */
	Chart.prototype.init = function(){
		
		var c = this.config;
		this.canvas = document.getElementById(c.canvas);
		ctx = this.canvas.getContext('2d')
		this.canvas.width = c.cw;
		this.canvas.height = c.ch;
		this.width = c.cw
		this.height = c.ch

		this.setValues()
		this.attachListener()
	};
	/**
	 * Preload from render
	 */
	Chart.prototype.setValues = function(){
		var c = this.config
		var total = getTotal(c.values)
		var lastAngle = 0;
		var cx = this.width/2
		var cy = this.height/2

		for (var i = 0; i < c.values.length; i++) {
	  		var end = lastAngle+radians(c.values[i].max/total)
	  		// Slice Parent
			this.slices.push(new Slice(
					cx,//x
					cy,//y
					c.radius+c.donutWith,//radius
					lastAngle,//startangle
					end,//endangle
					shadeColor(c.values[i].currentColor,.5),//color
					true,//is parent
					c.values[i],//data,
					c.values[i].labelPrefix//labelPrefix
				)
			)
			
	  		// Slice Child
			this.slices.push(new Slice(
					cx, 
					cy, 
					c.values[i].current/c.values[i].max*c.radius+c.donutWith, 
					lastAngle,
					end, 
					c.values[i].currentColor,
					false,
					c.values[i]
				)
			)

		    lastAngle += radians(c.values[i].max/total);
		}	
	};

	/** Mouse Handle */
	Chart.prototype.attachListener = function(){
		var self = this
		this.canvas.addEventListener("mousemove", function(e) {
		  var x = e.clientX - e.target.getBoundingClientRect().left;
		  var y = e.clientY - e.target.getBoundingClientRect().top;
		  this.mouseX = e.clientX 
		  this.mouseY = e.clientY

		  for (var i = 0; i < self.slices.length; i+=2) {
		  	   self.slices[i].render(function () {
				    if (ctx.isPointInPath(x, y)) {
				      self.slices[i].highlighted = true;
				      self.slices[i+1].highlighted = true;
				      self.config.onhover({
				      	parent:self.slices[i],
				      	child:self.slices[i+1],
				      	x:x,
				      	y:y
				      })
				    } else {
				      self.slices[i].highlighted = false;
				      self.slices[i+1].highlighted = false;
				    }
				    ctx.closePath();
			    })
		   }
		});
	};
	/** Render Slice of Pie */
	Chart.prototype.render = function(){

		ctx.clearRect(0, 0, this.width, this.height);
		var self = this
		this.slices.map(function(p) {
			p.render();
		});
	    
	    ctx.beginPath();
	    ctx.arc(this.width/2, this.height/2, this.config.donutWith, 0, 2 * Math.PI, false);
	    ctx.fillStyle = 'white';
	    ctx.fill();
		ctx.closePath();

	    _requestAnimationFrame(this.render.bind(this));
	};
	/** Update Pie */
	Chart.prototype.update = function(){
		this.setValues()
	};

	/**
	 * Slice of Pie
	 * @param {Number} cx          Center of slice X
	 * @param {Number} cy          Center of slice Y
	 * @param {Number} r           Radius
	 * @param {Number} pos         Start Angle
	 * @param {Number} len         End Angle
	 * @param {String} col         Primary Color
	 * @param {Bollean} isparent    
	 * @param {Object} data        Data of Slice
	 * @param {String} labelPrefix Label string
	 */
	function Slice(cx, cy, r, pos, len,col,isparent,data,labelPrefix) {
	  this.isparent = isparent
	  this.data = data
	  this.cx = cx;
	  this.cy = cy;
	  this.radius = r;
	  this.start = pos;
	  this.end = len;
	  this.color = col;
	  this.highlightedColor = shadeColor(this.color, .6);
	  this.highlighted = false;
	  this.labelPrefix = labelPrefix;

	}
	/** @todo Show tooltip */
	Slice.prototype.displayData = function(x,y){

	}
	/** Draw Slice */
	Slice.prototype.render = function(cb) {
	  
	  if (!this.highlighted) {
	    ctx.fillStyle = this.color;
	  } else {
	    ctx.fillStyle = this.highlightedColor;
	  }

	  ctx.strokeStyle = this.data.currentColor;
	  ctx.beginPath();

	  ctx.closePath();
	  if (this.isparent) {
	    // ctx.lineTo(this.cx, this.cy);
	    ctx.arc(this.cx, this.cy , this.radius, this.start, this.end,false);
	    ctx.lineWidth = _config.outSideLineWidth
	    ctx.stroke();
	  }

	  ctx.moveTo(this.cx, this.cy );
	  ctx.lineTo(this.cx, this.cy);
	  ctx.arc(this.cx, this.cy , this.radius, this.start, this.end);
	  ctx.fill();
	  
	  if (cb) cb()
	  if (this.highlighted) {
	    // Show tolltip
	    this.displayData()
	  }

	  if (this.isparent) {
	    this.showLine()
	  }
	}
	/** Draw slice label line  */
	Slice.prototype.showLine = function(){
	    var w = _config.cw
	    var h = _config.ch

	    var angle = (this.start+this.end)/2
	    var centerSliceX = this.cx  + (this.radius+_config.outSideLineWidth/2) * Math.cos(angle)
	    var centerSliceY = this.cy + (this.radius+_config.outSideLineWidth/2) * Math.sin(angle)
	    var pos = getSteps(angle)

	    var elX = centerSliceX+(pos.x*(_config.labelLineWidth))
	    var elY = centerSliceY+(pos.y*(_config.labelLineWidth))
	    
	    ctx.lineWidth = _config.labelStrokeWeight
	    ctx.strokeStyle = "#111111";
	    ctx.beginPath();
	    
	    // // Line
	    ctx.moveTo(centerSliceX,centerSliceY);
	    ctx.lineTo(elX,elY);

	    ctx.font = '10pt Calibri';
	    var text = this.labelPrefix + " " + this.data.max
	    var textpos = ctx.measureText(text)
	    ctx.fillStyle =  _config.labelColor;
	    ctx.textAlign = 'center';
	    
	    if (centerSliceX > w/2) {
	      ctx.lineTo(elX+_config.labelLineWidth,elY);
	      ctx.fillText(text ,elX+_config.labelLineOffset+_config.labelLineWidth+textpos.width/2,elY+_config.labelLineHeight);
	    }
	    if (centerSliceX < w/2) {
	      ctx.lineTo(elX-_config.labelLineWidth,elY);
	      ctx.fillText(text ,elX-_config.labelLineOffset-_config.labelLineWidth-textpos.width/2,elY+_config.labelLineHeight);
	    }

	    ctx.stroke();
	    ctx.closePath();
	    
	};

	/** @todo Handle Update */
	Slice.prototype.update = function() {

	}

	/**
	 * Position of slice label line
	 * @param  {Number} angle 
	 * @return {Number}       Position x and y origin by center of pie
	 */
	function getSteps(angle) {
	    var cos = Math.cos(angle),
	        sin = Math.sin(angle);

	    return {
	        x: cos,
	        y: sin ,
	    }
	}

	function radians(x) {
	    return 2 * Math.PI * x ;
	}
	/**
	 * Get all max value totatl
	 * @param  {Array} v Values fo array
	 * @return {Number}   Total size
	 */
	function getTotal(v) {
		return v.reduce(function (a,b) {
			return a+=b.max
		}, 0)
	}
	/**
	 * Opac color
	 * @param  {String} color   
	 * @param  {Number} percent 
	 * @return {String}         
	 */
	function shadeColor(color, percent) {
	  var f = parseInt(color.slice(1), 16),
	    t = percent < 0 ? 0 : 255,
	    p = percent < 0 ? percent * -1 : percent,
	    R = f >> 16,
	    G = f >> 8 & 0x00FF,
	    B = f & 0x0000FF;
	  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
	}
	/** @type {Native Code} Pollyfl animationframe */
	var _requestAnimationFrame = 	
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
		function(callback) {
			window.setInterval.bind(this,callback, 1000 / 60);
		};

	//Merge
	function mergeOptions(obj1,obj2){
	  var obj3 = {};
	  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	  return obj3;
	}

	
	window.Chart = Chart

})()