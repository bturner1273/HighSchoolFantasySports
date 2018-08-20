var initial_load = true;
var playersRef = firebase.database().ref("Players");
var playerList = [];

function pushPlayer(player){
    playersRef.push(player);
}

playersRef.endAt().limitToLast(1).on("child_added", function(snapshot){
  if(!initial_load){
    var toAdd = new Player(snapshot.val().name, snapshot.val().dob, snapshot.val().gradeLevel, snapshot.val().activeSport);
    playerList.push(toAdd);
    currentPlayersTable.append(toAdd.toTableRow());
  }
});

playersRef.on("value", function(snapshot){
    if(initial_load){
      initial_load = false;
      snapshot.forEach(function(childSnapshot){
        var toAdd = new Player(childSnapshot.val().name, childSnapshot.val().dob, childSnapshot.val().gradeLevel, childSnapshot.val().activeSport);
        playerList.push(toAdd);
        currentPlayersTable.append(toAdd.toTableRow());
      });
    }
});

function getAllPlayers(){
    return playerList;
}
