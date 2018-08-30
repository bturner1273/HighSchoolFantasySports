var Position = function(sport){
  this.sport = sport;
  this.positions = [];
};

Position.prototype.addPosition = function(position){
  this.positions.push(position);
};
