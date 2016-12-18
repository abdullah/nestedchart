
function Chart(s) {
  this.slices = s;
}

Chart.prototype.render = function() {
  this.slices.forEach(function(p) {
    p.render();
  });
};

Chart.prototype.update = function() {
    this.slices.forEach(function(p) {
      p.update();
    });
}
