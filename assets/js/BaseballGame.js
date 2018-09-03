var BaseballGame = function(){
  Game.apply(this, arguments);
  this.name = "baseball";
  this.setStatsToRecord(['AB', 'HITS', 'BA', 'HR','RBIS','RS','SB','W','ERA','WHIP','SO','S']);
};

//must be outside constructor
BaseballGame.prototype = Object.create(Game.prototype);
BaseballGame.prototype.constructor = BaseballGame;

// For hitters:
// Batting Average
// Home Runs
// RBIS
// Runs Scored
// Stolen Bases
//
// For pitchers:
// Wins
// ERA
// WHIP
// Strikeouts
// Saves
