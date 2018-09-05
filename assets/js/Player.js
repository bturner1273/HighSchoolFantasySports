var Player = function(name){
  this.name = name;
};

var Player = function(name, dob, gradeLevel, activeSport){
    this.gameCount = 0;
    this.name = name;
    this.dob = dob;
    this.gradeLevel = gradeLevel;
    this.activeSport = activeSport;
    this.sports = [activeSport];
    this.positions = [new Position(activeSport)];
    this.stats = [new Stats(activeSport)];
    this.gameRecords = [];
};

var Player = function(gameCount, name, dob, gradeLevel, activeSport, sports, positions, stats, gameRecords){
  this.gameCount = gameCount;
  this.name = name;
  this.dob = dob;
  this.gradeLevel = gradeLevel;
  this.activeSport = activeSport;
  this.sports = sports;
  this.positions = positions;
  this.stats = stats;
  this.gameRecords = gameRecords;
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
    var row = $("<tr></tr>");
    var name = $('<td></td>');
    name.html(this.name);
    var dob = $('<td></td>');
    dob.html(this.dob);
    var grade = $('<td></td>');
    grade.html(this.gradeLevel);
    var sports = $('<td></td>');
    sports.html(this.sports);
    var check = $('<td></td>');
    var checkbox = $('<input type="checkbox">');
    check.append(checkbox);
    var remove = $('<td><button type="button" class="close" style="color:red;" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>');
    if(tf){
      row.append(name,dob,grade,sports,check,remove);
    }else{
      row.append(name,dob,grade,sports,check);
    }
    return row;
};

Player.prototype.toString = function(){
  return "Player: " + this.name + " DOB: " + this.dob + " Grade level: " + this.gradeLevel +
  "\nActive sport: " + this.activeSport +  " Sports: " + this.sports + " Stats: " + this.stats;
};
