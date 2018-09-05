var BaseballGame = function(){
  Game.apply(this, arguments);
  this.name = "baseball";
  this.setStatsToRecord(['AB', 'HITS', 'BA*', 'HR','RBIS','RS','SB','W','ERA', 'WA', 'H', 'WHIP*','SO','S']);
  this.setAggregatedRows([4,13]);
};

//must be outside constructor
BaseballGame.prototype = Object.create(Game.prototype);
BaseballGame.prototype.constructor = BaseballGame;


//implementing abstract methods from game class
BaseballGame.prototype.bindAggregateStats = function(){
  var bindingAtBats = this.getGameModalCol(2);
  var bindingHits = this.getGameModalCol(3);
  var bindToBattingAverage = this.getAggregateCol(4);
  var bindingWalksEarnedOffPitcher = this.getGameModalCol(11);
  var bindingHitsEarnedOffPitcher = this.getGameModalCol(12);
  var bindToWHIP = this.getAggregateCol(13);

  $(bindingAtBats).each(function(index){
    $(this).on("input", function(){
      bindToBattingAverage[index].innerHTML = (+bindingHits[index].value / +bindingAtBats[index].value).toFixed(3);
    });
  });

  $(bindingHits).each(function(index){
    $(this).on("input", function(){
      bindToBattingAverage[index].innerHTML = (bindingHits[index].value / +bindingAtBats[index].value).toFixed(3);
    });
  });

  $(bindingWalksEarnedOffPitcher).each(function(index){
    $(this).on("input", function(){
      bindToWHIP[index].innerHTML = ((+bindingHitsEarnedOffPitcher[index].value + bindingWalksEarnedOffPitcher[index].value)/9).toFixed(3);
    });
  });

  $(bindingHitsEarnedOffPitcher).each(function(index){
    $(this).on("input", function(){
      bindToWHIP[index].innerHTML = ((+bindingHitsEarnedOffPitcher[index].value + bindingWalksEarnedOffPitcher[index].value)/9).toFixed(3);
    });
  });
};
