var BaseballGame = function(){
  Game.apply(this, arguments);
  this.setName('baseball');
};

BaseballGame.prototype = Object.create(Game.prototype);
BaseballGame.prototype.constructor = BaseballGame;
