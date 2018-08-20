var initial_load = true;
var playersRef = firebase.database().ref("Players");
var playerList = [];

function pushPlayer(player){
    playersRef.push(player);
}

//working on removing from db
function removePlayer(player){
  console.log("removing: " + $(player).parent().parent()[0].cells[0].innerHTML);
}

playersRef.endAt().limitToLast(1).on("child_added", function(snapshot){
  if(!initial_load){
    var toAdd = new Player(snapshot.val().name, snapshot.val().dob, snapshot.val().gradeLevel, snapshot.val().activeSport);
    playerList.push(toAdd);
    currentPlayersTable.append(toAdd.toTableRow());
    bindLastRemoveButton();
  }
});

playersRef.on("value", function(snapshot){
    if(initial_load){
      data = snapshot;
      initial_load = false;
      snapshot.forEach(function(childSnapshot){
        var toAdd = new Player(childSnapshot.val().name, childSnapshot.val().dob, childSnapshot.val().gradeLevel, childSnapshot.val().activeSport);
        playerList.push(toAdd);
        currentPlayersTable.append(toAdd.toTableRow());
      });
      bindRemoveButtons();
    }
});

function getAllPlayers(){
    return playerList;
}
