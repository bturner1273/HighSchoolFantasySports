var Game = function(){
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

//concrete functions
Game.prototype.inputStatsToRecord = function(){
  //numGames must be a stat that every game records for every player for every game
};


//abstract functions
Game.prototype.recordPlay = function(){
  throw new Error("Abstract function must be implemented before being called");
};

Game.prototype.updatePlayerStats = function(){
  throw new Error("Abstract function must be implemented before being called");
};
