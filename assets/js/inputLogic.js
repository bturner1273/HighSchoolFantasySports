var newPlayersTable = $("#newPlayersTable");
var currentPlayersTable = $("#currentPlayersTable");

var newPlayerName = $('[name="name"]');
var newPlayerDob = $('[name="dob"]');
var newPlayerGrade = $('[name="grade"]');
var newPlayerSports = $('[name="sports"]');

// console.log(newPlayersTable.html() + "\n\n" + currentPlayersTable.html());

$(document).on("keypress", function(event){
    if(event.which == 13 || event.keyCode == 13){
        if(newPlayerName.val() != null && newPlayerName.val() !=""){
          var toAdd = new Player(newPlayerName.val(), newPlayerDob.val(), newPlayerGrade.val(), newPlayerSports.val());
          newPlayerName.val("");
          newPlayerDob.val("");
          newPlayerGrade.val("");
          newPlayerSports.val("");
          currentPlayersTable.append(toAdd.toTableRow());
          //push toAdd to firebase and make onChildedAdded, onChildRemoved, and onValue functions
        }
        // console.log(newPlayerName.val() + "\n" + newPlayerDob.val() + "\n" + newPlayerGrade.val() + "\n" + newPlayerSports.val());
    }
});
