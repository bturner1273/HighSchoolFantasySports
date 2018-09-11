var Player = function(name, dob, gradeLevel, activeSport, gameCount, sports, positions, stats, gameRecords){
  if(gameCount && sports && positions && stats && gameRecords){
    this.name = name;
    this.dob = dob;
    this.gradeLevel = gradeLevel;
    this.activeSport = activeSport;
    this.gameCount = gameCount;
    this.sports = sports;
    this.positions = positions;
    this.stats = stats;
    this.gameRecords = gameRecords;
  }else{
    this.gameCount = 0;
    this.name = name;
    this.dob = dob;
    this.gradeLevel = gradeLevel;
    this.activeSport = activeSport;
    this.sports = [activeSport];
    this.positions = [new Position(activeSport)];
    this.stats = [new Stats(activeSport)];
    this.gameRecords = [];
  }
};

Player.prototype.getStatsFor = function(sport){
    for(var i = 0; i < this.stats.length; i++){
      if(this.stats[i].sport.toUpperCase() == sport.toUpperCase()){
        return this.stats[i];
      }
    }
};

//this function will do all the compounding of the stats
Player.prototype.updateStats = function(){
  this.gameRecords.forEach(function(){

  });
};

Player.prototype.hasStatsFor = function(sport){
  for(var i = 0; i < this.stats.length; i++){
    if(this.stats[i].sport.toUpperCase() == sport.toUpperCase()){
      return true;
    }
  }
  return false;
};

Player.prototype.addSport = function(sport){
    this.sports.push(sport);
    this.stats.push(new Stats(sport));
};

Player.prototype.toTableRow = function(tf){
    var row = $($("#playerRowTemplate").html());
    var name = $($("#playerDataTemplate").html()).html(this.name);
    var grade = $($("#playerDataTemplate").html()).html(this.gradeLevel);
    var sports = $($("#playerDataTemplate").html()).html(this.sports);
    var check = $($("#playerCheckboxTemplate").html());
    var remove = $($("#playerRemoveButtonTemplate").html());
    if(tf){
      row.append(name,grade,sports,check,remove);
    }else{
      row.append(name,grade,sports,check);
    }
    return row;
};
