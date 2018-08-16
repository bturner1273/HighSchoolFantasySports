var Game = function(){
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

Game.prototype.setName = function(name){
  this.name = name;
};

//concrete functions
Game.prototype.inputStatsToRecord = function(){

};


//abstract functions
Game.prototype.recordPlay = function(){
  throw new Error("Abstract function must be implemented before being called");
};

Game.prototype.updatePlayerStats = function(){
  throw new Error("Abstract function must be implemented before being called");
};
