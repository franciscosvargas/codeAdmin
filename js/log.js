function getItemLog(){
    var dataLog = [];
	let ref = firebase.database().ref('log/');
	ref.on('child_added', function(data) {
        dataLog[0] = data.val().username;
        dataLog[1] = data.val().action;
        dataLog[2] = data.val().date + " às "+ data.val().hour;
        dataLog[3] = data.key;
        insertItemOnList(dataLog[0], dataLog[1], dataLog[2], dataLog[3]);
    });
   
	ref.on('child_removed', function(data) {
        $("#"+ data.key).remove().fadeOut(300);
        listEmpty();
	});
}

function insertItemOnList(username, action, date, key){
    let pictureRef = firebase.database().ref('admin/' + username + '/photoURL');
        pictureRef.on('value', function(snapshot) {
            let foto = snapshot.val();
            $('#my-list-2').append(" <li class='mdc-list-item Item  mdc-list--avatar-list' id='"+key+"' onclick='viewSuggestion(this.id);'> <img class='mdc-list-item__graphic' src="+foto+" role='presentation'></img> <span class='mdc-list-item__text'> <span class='mdc-list-item__primary-text'>"+action+"</span> <span class='mdc-list-item__secondary-text'>"+date+"</span> </span> </li>").fadeIn(300);
            $("#listEmptyLi").remove();
            $('.mdc-fab').show();
});  

}

function clearLog(){
    let ref = firebase.database().ref('/log');
    ref.remove();
    showSnackBar("O histórico foi apagado");
    listEmpty();
}

function listEmpty(){
	if($('#my-list-2 li').length == 0){
		$('#my-list-2').append(" <li class='mdc-list-item Item  mdc-list--avatar-list' id='listEmptyLi'> <span class='mdc-list-item__graphic' role='presentation'> <i class='material-icons' aria-hidden='true'>info</i> </span> <span class='mdc-list-item__text'> <span class='mdc-list-item__primary-text'>Não há registros.</span> <span class='mdc-list-item__secondary-text'>Aproveite para descansar</span> </span> </li>").fadeIn(300);
        $('.mdc-fab').hide();
    }else{
        $("#listEmptyLi").remove();
        $('.mdc-fab').show();
	}
}