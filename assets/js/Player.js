var Player = function(name){
  this.name = name;
};

var Player = function(name, dob, gradeLevel, activeSport){
    this.name = name;
    this.dob = dob;
    this.gradeLevel = gradeLevel;
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

//will return a table row representing this player
Player.prototype.toTableRow = function(){
    var row = $("<tr></tr>");
    var name = $('<td></td>');
    name.html(this.name);
    var dob = $('<td></td>');
    dob.html(this.dob);
    var grade = $('<td></td>');
    grade.html(this.gradeLevel);
    var sports = $('<td></td>');
    sports.html(this.sports);
    var radio = $('<td></td>');
    var radio_btn = $('<input type="checkbox">');
    radio.append(radio_btn);
    var remove = $('<td><button type="button" class="close" style="color:red;" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>');
    row.append(name,dob,grade,sports,radio,remove);
    return row;
};

Player.prototype.toString = function(){
  return "Player: " + this.name + " DOB: " + this.dob + " Grade level: " + this.gradeLevel +
  "\nActive sport: " + this.activeSport +  " Sports: " + this.sports + " Stats: " + this.stats;
};
