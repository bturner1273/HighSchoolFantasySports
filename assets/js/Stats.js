var Stats = function(sport){
  this.sport = sport;
  this.stats_table = [];
};

Stats.prototype.addStat = function(key, value){
  this.stats_table.push({key: key, value: value});
};

Stats.prototype.setStat = function(key, value){
  for(var i = 0; i < this.stats_table.length; i++){
    if(this.stats_table[i].key.toUpperCase() == key.toUpperCase()){
      this.stats_table[i].value = value;
    }
  }
};

Stats.prototype.getStat = function(key){
  for(var i = 0; i < this.stats_table.length; i++){
    if(this.stats_table[i].key.toUpperCase() == key.toUpperCase()){
      return this.stats_table[i];
    }
  }
};
