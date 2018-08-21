var initial_load = true;
var playersRef = firebase.database().ref("Players");
var playerList = [];


function pushPlayer(player){
    playersRef.child(player.name).set(player);
    playerList.push(player);
    currentPlayersTable.append(player.toTableRow());
    bindLastRemoveButton();
}

function removePlayer(player){
  playersRef.child($(player).parent().parent()[0].cells[0].innerHTML).remove();
}

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
