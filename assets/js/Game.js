var Game = function(){
  this.statsToRecord = ['NG'];
  this.players = [];
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

//concrete functions
Game.prototype.setStatsToRecord = function(statsToRecord){
  // console.log('stats to record: ' + statsToRecord);
  this.statsToRecord = this.statsToRecord.concat(statsToRecord);
  // console.log('this games stats to record after being set: ' + this.statsToRecord);
};

Game.prototype.getPlayersFromStart = function(){
  //selects all checked checkboxes
  var checkboxes = $("input[type=checkbox]:checked");
  checkboxes.forEach(function(){
    //push the player represented by the checkbox
    this.players.push();
  });

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
  var th = $("<th class='container-fluid'></th>");
  th.append($('<td></td>'));
  this.statsToRecord.forEach(function(e){
    th.append($("<td>" + e + "</td>"));
  });
  // console.log('this is supposed to be the th object to be loaded into the table: ' + th.html());
  $('#modalTable').append(th);
};

Game.prototype.showGameModal = function(){
  this.inputGameStatsToModal();
  setTimeout(function(){
    $("#gameModal").modal('show');
  }, 450);
};


//abstract functions
Game.prototype.recordPlay = function(){
  throw new Error("Abstract function must be implemented before being called");
};

Game.prototype.updatePlayerStats = function(){
  throw new Error("Abstract function must be implemented before being called");
};
