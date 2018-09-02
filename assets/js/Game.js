//is this branch still master?

var firstLoad = true;


var Game = function(){
  this.statsToRecord = ['NG'];
  this.players = [];
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

//concrete functions
Game.prototype.setStatsToRecord = function(statsToRecord){
  this.statsToRecord = this.statsToRecord.concat(statsToRecord);
};

Game.prototype.addPlayersToGame = function(){
  var checkboxes = $("input[type=checkbox]:checked");
  for(var i = 0; i < checkboxes.length; i++){
     $(checkboxes[i]).prop('checked', false);
     this.addPlayer(getPlayerByName($(checkboxes[i]).parent().parent()[0].cells[0].innerHTML));
  }

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



Game.prototype.setUpGameModal = function(){
  if(firstLoad){
    firstLoad = false;
    var th = $("<tr class='container-fluid'></tr>");
    th.append($('<td></td>'));
    this.statsToRecord.forEach(function(e){
      th.append($("<td>" + e + "</td>"));
    });
    // console.log('this is supposed to be the th object to be loaded into the table: ' + th.html());
    $('#modalTable').append(th);
    this.addPlayersToGame();
    //put player rows in
    var tb = $("<tbody></tbody>");
    for(var i = 0; i < this.players.length; i++){
      var tr = $("<tr></tr>");
      for(var j = 0; j < this.statsToRecord.length+1; j++){
        if(j==0){
           tr.append($("<td>" + this.players[i].name + "</td>"));
        }else tr.append($("<td><input type='text' class='text-white bg-dark text-center' style='width:50px;' value='0'></td>"));
      }
      tb.append(tr);
    }
    $("#modalTable").append(tb);
  }
};

Game.prototype.showGameModal = function(){
  this.setUpGameModal();
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
