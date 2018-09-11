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
    currentPlayersTable.append(player.toTableRow(true));
    bindLastRemoveButton();
}

function pushPlayerWithoutAppendingToTable(player){
      playersRef.child(player.name).set(player);
      playerList.push(player);
}

function removePlayer(player){
  playersRef.child($(player).parent().parent()[0].cells[0].innerHTML).remove();
  // $(player).closest(".parent_class"). // find first accessor whose class is parent_class IMPORTANT
  removeFromPlayerList(player);
}

// todo: get rid of localeCompare
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

function reloadCurrentPlayersTable(){
  $("#currentPlayersTable").children().remove();
  $("#currentPlayersTable").append($($("#currentPlayersTableHeader").html()));
  playerList.forEach(function(e){
    $("#currentPlayersTable").append(e.toTableRow(true));
  });
}

playersRef.on("value", function(snapshot){
    if(initial_load){
      data = snapshot;
      initial_load = false;
      snapshot.forEach(function(childSnapshot){
        var toAdd = new Player(childSnapshot.val().name, childSnapshot.val().gradeLevel, childSnapshot.val().activeSport, childSnapshot.val().gameCount, childSnapshot.val().sports, childSnapshot.val().positions, childSnapshot.val().stats, childSnapshot.val().gameRecords);
        playerList.push(toAdd);
        currentPlayersTable.append(toAdd.toTableRow(true));
      });
      bindRemoveButtons();
    }
});
