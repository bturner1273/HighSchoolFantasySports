

var brad = new Player("brad", "4/19/1996", "Senior", "baseball");
brad.getStatsFor('baseball').addStat("rbi", 100);
console.log(brad.getStatsFor('baseball').getStat('rbi'));
console.log(brad);


var baseballGame = new BaseballGame();
console.log(baseballGame.name);
// baseballGame.updatePlayerStats(); throws exception because it is unimplemented in BaseballGame class
