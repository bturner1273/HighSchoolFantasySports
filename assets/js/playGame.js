var playBaseball = $("#playBaseball");
var playFootball = $("#playFootball");
var playSoccer = $("#playSoccer");
var playBasketball = $("#playBasketball");


var closeGameButton = $("#closeGameButton");
var addPlayerButton = $("#addPlayerButton");
var saveGameButton = $("#saveGameButton");

var game;

playBaseball.click(function(){
      $("#pickGameModal").modal('toggle');
      $("#gameModal").modal('toggle');
      game = new BaseballGame();
      console.log('New baseball game initialized ' + game.timeStamp);
      game.showGameModal();
      game.bindStatAbreviationExplanations(['', '# Games', '# Times At Bat', '# Hits At Bat', 'Batting Average*', '# Home Runs', '# Runs Batted In', 'Runs Scored', '# Stolen Bases', 'Wins', 'Runs Earned Off This Pitcher', 'Walks Earned Off This Pitcher', 'Hits Earned Off This Pitcher', 'Walks Plus Hits Per Inning Pitched', '# Strikeouts', '# Saves' ]);
      game.bindAggregateStats();
      makeGameResumable();
});

//other games to be implemented
playFootball.click(function(){

});

playSoccer.click(function(){

});

playBasketball.click(function(){

});


addPlayerButton.click(function(){
  loadAddablePlayersTable(arrayDiff(playerList, game.players));
});

function loadAddablePlayersTable(players){
  $("#addPlayersTable").children().remove();
  $(players).each(function(){
    $("#addPlayersTable").append(this.toTableRow(false));
  });
  $("#addPlayersModal").modal('toggle');
}


function arrayDiff(a, b) {
  return a.filter(
    function(el) {
      return b.indexOf(el) < 0;
    }
  );
}

closeGameButton.click(function(){
  game = null;
  backToStart();
});

saveGameButton.click(function(){
  game.updatePlayerGameRecords();
  game.updateDatabase();
  hideGameModal();
  backToStart();
  game.players.forEach(function(player){
    player.updateStats();
  });
  game = null;
  reloadCurrentPlayersTable();
});

function hideGameModal(){
  $("#gameModal").modal('toggle');
}

function backToStart(){
  $("#modalTable").children().remove();
  $("#start_game").html("Start Game").attr('data-target', '#pickGameModal');
  firstLoad = true;
}

function makeGameResumable(){
  setTimeout(function(){
    $("#start_game").html("Resume Game").attr("data-target", "#gameModal");
  }, 750);
}
