var BaseballGame = function(){
  Game.apply(this, arguments);
  this.name = "baseball";
};

BaseballGame.prototype = Object.create(Game.prototype);
BaseballGame.prototype.constructor = BaseballGame;
