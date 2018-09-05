//still todo:
/*
active sport inputs for player entry are most likely
unnecessary now as the game classes will change the players
active sport if they are player that game

-Add player functionality in game modal
*/
var firstLoad = true;

var Game = function(){
  this.timeStamp = new Date();
  this.statsToRecord = ['NG*'];
  this.players = [];
  this.aggregatedRows = [1];
  if(this.constructor === Game){
    throw new Error("Cannot instantiate an abstract class");
  }
};

//concrete functions
Game.prototype.setAggregatedRows = function(aggregatedRows){
  this.aggregatedRows = this.aggregatedRows.concat(aggregatedRows);
};

Game.prototype.getAggregateCol = function(col){
  var tableDatum = $("#modalTable tr:not(:first) td");
  var toReturn = [];
  for(var i = col; i < tableDatum.length; i+=this.statsToRecord.length+1){
    toReturn.push(tableDatum[i]);
  }
  return toReturn;
};

Game.prototype.getGameModalCol = function(col){
  var tableDatum = $("#modalTable tr:not(:first) td");
  var toReturn = [];
  for(var i = col; i < tableDatum.length; i+=this.statsToRecord.length+1){
    toReturn.push($(tableDatum[i]).children().get(1));
  }
  return toReturn;
};

Game.prototype.setStatsToRecord = function(statsToRecord){
  this.statsToRecord = this.statsToRecord.concat(statsToRecord);
};

Game.prototype.addPlayersToGame = function(){
  var checkboxes = $("input[type=checkbox]:checked");
  for(var i = 0; i < checkboxes.length; i++){
     $(checkboxes[i]).prop('checked', false);
     this.addPlayer(getPlayerByName($(checkboxes[i]).parent().parent()[0].cells[0].innerHTML));
  }
  this.loadPlayerStats();
  this.loadPlayerGameRecords();
};

Game.prototype.loadPlayerStats = function(){
  for(var i = 0; i < this.players.length; i++){
      if(!this.players[i].hasStatsFor(this.players[i].activeSport)){
        this.players[i].addSport(this.players[i].activeSport);
      }
      if(this.players[i].getStatsFor(this.players[i].activeSport).stats_table.length != this.statsToRecord.length){
        this.players[i].getStatsFor(this.players[i].activeSport).stats_table.length = 0;
        for(var j = 0; j < this.statsToRecord.length; j++){
          this.players[i].getStatsFor(this.players[i].activeSport).addStat(this.statsToRecord[j], 0);
        }
      }
  }
};

Game.prototype.loadPlayerGameRecords = function(){
  for(var i = 0; i < this.players.length; i++){
    var value = new Stats(this.players[i].activeSport);
    for(var j = 0; j < this.statsToRecord.length; j++){
      value.addStat(this.statsToRecord[j], 0);
    }
    this.players[i].gameRecords.push({key: this.players[i].activeSport + " Game " + this.players[i].getStatsFor(this.players[i].activeSport).getStat("ng*").value, value: value});
  }
};

Game.prototype.addPlayer = function(player){
  this.players.push(player);
};

Game.prototype.incrementNumGames = function(){
  this.numGames++;
};

Game.prototype.setUpGameModal = function(aggregatedRows){
  if(firstLoad){
    firstLoad = false;
    var th = $("<tr class='container-fluid'></tr>");
    th.append($('<td></td>'));
    this.statsToRecord.forEach(function(e){
      th.append($("<td>" + '<button type="button" class="btn btn-dark statAbreviations" data-toggle="tooltip" data-placement="bottom" title="">' + e + '</button>' + "</td>"));
    });
    $('#modalTable').append(th);
    this.addPlayersToGame();

    var tb = $("<tbody></tbody>");
    for(var i = 0; i < this.players.length; i++){
      var tr = $("<tr></tr>");
      for(var j = 0; j < this.statsToRecord.length+1; j++){
        if(j==0){
           tr.append($("<td>" + this.players[i].name + "</td>"));
        }else if(aggregatedRows.find(e => e == j) == j){
           tr.append($("<td>0</td>"));
        }else tr.append($("<td><button type='button' class='btn btn-dark btn-sm decrementButton'> - </button><input type='text' class='bg-secondary text-white text-center' value='0'><button type='button' class='btn btn-dark btn-sm incrementButton'> + </button></td>"));
      }
      tb.append(tr);
    }
    $("#modalTable").append(tb);
    bindIncrementAndDecrementButtons();
  }
};

function bindIncrementAndDecrementButtons(){
  $(".incrementButton").each(function(){
    $(this).click(function(){
        $($(this).parent().children().get(1)).val(+$($(this).parent().children().get(1)).val()+1);
        $($(this).parent().children().get(1)).trigger("input");
    });
  });

  $(".decrementButton").each(function(){
    $(this).click(function(){
      if($($(this).parent().children().get(1)).val() >= 1){
        $($(this).parent().children().get(1)).val(+$($(this).parent().children().get(1)).val()-1);
        $($(this).parent().children().get(1)).trigger("input");
      }else{
          $($(this).parent().children().get(1)).val(0);
      }
    });
  });
}

Game.prototype.setPlayersActiveSport = function(sport){
  this.players.forEach(function(e){
    e.activeSport = sport;
  });
};

Game.prototype.showGameModal = function(){
  this.setUpGameModal(this.aggregatedRows);
  setTimeout(function(){
    $("#gameModal").modal('show');
  }, 650);
};

Game.prototype.bindStatAbreviationExplanations = function(statExplanationList){
  $(".statAbreviations").each(function(index){
    $(this).attr('title', statExplanationList[index+1]);
  });
};

Game.prototype.updatePlayerGameRecords = function(){
  var length = this.statsToRecord.length;
  var tempStats = this.statsToRecord;
  var tempAgRows = this.aggregatedRows;

  $("#modalTable tr:not(:first)").each(function(){
    for(var i = 0; i < length; i++){
      if(tempAgRows.includes(i+1)){
        getPlayerByName(this.cells[0].innerHTML).gameRecords[getPlayerByName(this.cells[0].innerHTML).gameCount].value.setStat(tempStats[i], this.cells[i+1].innerHTML);
      }else{
        getPlayerByName(this.cells[0].innerHTML).gameRecords[getPlayerByName(this.cells[0].innerHTML).gameCount].value.setStat(tempStats[i], $(this.cells[i+1]).children()[1].value);
      }
    }
  });

  this.players.forEach(function(e){
    e.gameRecords[e.gameCount].value.setStat("ng*",+e.gameRecords[e.gameCount].value.getStat("ng*").value + 1);
    e.getStatsFor(e.activeSport).setStat("ng*", +e.getStatsFor(e.activeSport).getStat("ng*").value + 1);
    e.gameCount++;
  });
};

Game.prototype.updateDatabase = function(){
  this.players.forEach(function(e){
    removePlayerObject(e);
  });
  this.players.forEach(function(e){
    pushPlayerWithoutAppendingToTable(e);
  });
};

//abstract functions
Game.prototype.bindAggregateStats = function(){
  throw new Error("Abstract function must be implemented before being called");
};

Game.prototype.recordSnapshot = function(){
  throw new Error("Abstract function must be implemented before being called");
};
