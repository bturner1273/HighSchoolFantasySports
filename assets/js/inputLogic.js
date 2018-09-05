var newPlayersTable = $("#newPlayersTable");
var currentPlayersTable = $("#currentPlayersTable");
var newPlayerName = $('[name="name"]');
var newPlayerDob = $('[name="dob"]');
var newPlayerGrade = $('[name="grade"]');
var newPlayerSports = $('[name="sports"]');
var enterPlayerButton = $("#enter_player");

function removeFromCurrentPlayersTable(element){
  removePlayer(element);
  $(element).parent().parent().remove();
}

function bindRemoveButtons(){
  $('.close').each(function(){
      $(this).on("click", function(){
        removeFromCurrentPlayersTable(this);
      });
  });
}

function bindLastRemoveButton(){
  var buttons = $('.close');
  $(buttons[buttons.length-1]).on("click", function(){
    removeFromCurrentPlayersTable(this);
  });
}

enterPlayerButton.on("click", function(){
  getPlayer();
});

function getPlayer(){
  if(newPlayerName.val() != null && newPlayerName.val() !=""){
    var toAdd = new Player(newPlayerName.val(), newPlayerDob.val(), newPlayerGrade.val(), newPlayerSports.val());
    newPlayerName.val("");
    newPlayerDob.val("");
    newPlayerGrade.val("");
    newPlayerSports.val("");
    pushPlayer(toAdd);
  }
}

$(document).on("keypress", function(event){
    if(event.which == 13 || event.keyCode == 13){
        getPlayer();
    }
});
