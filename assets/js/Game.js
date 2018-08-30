var Game = function(){
  //these show up in subclasses
  this.numGames = 0;
  this.statsToRecord = [];
  this.players = [];
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

//concrete functions
Game.prototype.setStatsToRecord = function(statsToRecord){
  this.statsToRecord = statsToRecord;
};

Game.prototype.setPlayers = function(players){
  this.players = players;
};

Game.prototype.addPlayer = function(player){
  this.players.push(player);
};

Game.prototype.incrementNumGames = function(){
  this.numGames++;
};

Game.prototype.inputGameStatsToModal = function(){
  var th = $("<th><td></td></th>");
  this.statsToRecord.forEach(function(e){
    th.append($("<td>" + e + "</td>"));
  });
  $('#modalTable').append(th);
};

Game.prototype.showGameModal = function(){
  this.inputGameStatsToModal();
  setTimeout(function(){
    $("#gameModal").modal('show');
  }, 300);
};


//abstract functions
Game.prototype.recordPlay = function(){
  throw new Error("Abstract function must be implemented before being called");
};

Game.prototype.updatePlayerStats = function(){
  throw new Error("Abstract function must be implemented before being called");
};
