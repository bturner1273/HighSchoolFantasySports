var playBaseball = $("#playBaseball");
var playFootball = $("#playFootball");
var playSoccer = $("playSoccer");
var playBasketball = $("playBasketball");


var closeGameButton = $("#closeGameButton");
var addPlayerButton = $("#addPlayerButton");

var game;

playBaseball.click(function(){
      $("#pickGameModal").modal('toggle');
      $("#gameModal").modal('toggle');
      game = new BaseballGame();
      console.log('New baseball game initialized ' + game.timeStamp);
      game.setPlayersActiveSport("baseball");
      game.showGameModal([4,13]);
      game.bindStatAbreviationExplanations(['# Times At Bat', '# Hits At Bat', 'Batting Average*', '# Home Runs', '# Runs Batted In', 'Runs Scored', '# Stolen Bases', 'Wins', 'Runs Earned Off This Pitcher', 'Walks Earned Off This Pitcher', 'Hits Earned Off This Pitcher', 'Walks Plus Hits Per Inning Pitched', '# Strikeouts', '# Saves' ]);
      makeGameResumable();
});

//other games to be implemented
playFootball.click(function(){

});

playSoccer.click(function(){

});

playBasketball.click(function(){

});

closeGameButton.click(function(){
  game = null;
  backToStart();
});


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
