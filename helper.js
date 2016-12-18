function radians(x) {
    return 2 * Math.PI * x ;
}

function getTotal(v) {
	return v.reduce(function (a,b) {
		return a+=b.max
	}, 0)
}

function shadeColor(color, percent) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = f >> 8 & 0x00FF,
    B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

var _requestAnimationFrame = 	
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
	function(callback) {
		window.setInterval.bind(this,callback, 1000 / 60);
	};