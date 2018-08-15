var Player = function(name){
  this.name = name;
};

var Player = function(name, dob, gradeLevel, activeSport){
    this.name = name;
    this.dob = dob;
    this.gradLevel = gradeLevel;
    this.activeSport = activeSport;
    this.sports = [activeSport];
    this.stats = [new Stats(activeSport)];
};

Player.prototype.getStatsFor = function(sport){
    for(var i = 0; i < this.stats.length; i++){
      if(this.stats[i].sport.toUpperCase() == sport.toUpperCase()){
        return this.stats[i];
      }
    }
};

Player.prototype.addSport = function(sport){
    this.sports.push(sport);
    this.stats.push(new Stats(sport));
};

Player.prototype.toString = function(){
  return "Player: " + this.name + " DOB: " + this.dob + " Grade level: " + this.gradeLevel +
  "\nActive sport: " + this.activeSport +  " Sports: " + this.sports + " Stats: " + this.stats;
};
