var initial_load = true;
var playersRef = firebase.database().ref("Players");
var playerList = [];


function getPlayerByName(name){
  for(var i = 0; i < playerList.length; i++){
    if(playerList[i].name.localeCompare(name, 'en', {'sensitivity':'base'}) == 0){
      return playerList[i];
    }
  }
  return false;
}

function pushPlayer(player){
    playersRef.child(player.name).set(player);
    playerList.push(player);
    currentPlayersTable.append(player.toTableRow());
    bindLastRemoveButton();
}

function pushPlayerWithoutAppendingToTable(player){
      playersRef.child(player.name).set(player);
      playerList.push(player);
}

function removePlayer(player){
  playersRef.child($(player).parent().parent()[0].cells[0].innerHTML).remove();
  removeFromPlayerList(player);
}

function removeFromPlayerList(player){
  for(var i = 0; i < playerList.length; i++){
    if(playerList[i].name.localeCompare(player.name, 'en', {'sensitivity':'base'}) == 0){
      playerList.splice(i,1);
    }
  }
}

function removePlayerObject(player){
  playersRef.child(player.name).remove();
  removeFromPlayerList(player);
}

playersRef.on("value", function(snapshot){
    if(initial_load){
      data = snapshot;
      initial_load = false;
      snapshot.forEach(function(childSnapshot){
        var toAdd = new Player(childSnapshot.val().name, childSnapshot.val().dob, childSnapshot.val().gradeLevel, childSnapshot.val().activeSport);
        playerList.push(toAdd);
        currentPlayersTable.append(toAdd.toTableRow(true));
      });
      bindRemoveButtons();
    }
});
