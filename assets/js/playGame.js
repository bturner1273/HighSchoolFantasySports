var playBaseball = $("#playBaseball");
var playFootball = $("#playFootball");
var playSoccer = $("playSoccer");
var playBaseketball = $("playBasketball");

var game;

playBaseball.click(function(){
      $("#pickGameModal").modal('toggle');
      $("#gameModal").modal('toggle');
      game = new BaseballGame();
      console.log('New baseball game initialized');
      game.showGameModal();
});
