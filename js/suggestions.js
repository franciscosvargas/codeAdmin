
function listSuggestions(){
	let ref = firebase.database().ref('sugestions/');
		ref.on('child_added', function(data) {
		let commandName = data.val().command;
		let languageName = data.val().language;
		$('#my-list').append(" <li class='mdc-list-item suggestionItem  mdc-list--avatar-list' id='"+data.key+"' onclick='viewSuggestion(this.id);'> <span class='mdc-list-item__graphic' role='presentation'> <i class='material-icons' aria-hidden='true'>message</i> </span> <span class='mdc-list-item__text'> <span class='mdc-list-item__primary-text'>"+commandName+"</span> <span class='mdc-list-item__secondary-text'>"+languageName+"</span> </span> </li>");
		$("#listEmptyLi").remove();
	});

	ref.on('child_removed', function(data) {
		$("#"+ data.key).remove().fadeOut(300);
		listEmpty();
	});
	
	
}
var dataRef = []; // DATA FROM SUGGESTION SELECTED
function viewSuggestion(cID){
	let count = 0;
	dataRef[4] = cID;
	let ref = firebase.database().ref('sugestions/'+ cID);
	ref.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
		   dataRef[count] = childSnapshot.val();
		   count++;
		});
		
	});
	$("#editCommandName").text(dataRef[0]);
	$("#editLanguageName").text(dataRef[2]);
	$("#editMessage").text(dataRef[3]);
	$(".suggestionEdit").fadeIn(300);
	return 0;
}

function deleteSuggestion(){

	let ref = firebase.database().ref('sugestions/' + dataRef[4]);
	ref.remove();
	$('.suggestionEdit').fadeOut(300);
	showSnackBar('Sugestão deletada');
	writeOnLog("Descartou a sugestão: "+ dataRef[0]);
}

function addSuggestion(){
	let ref = firebase.database().ref('sugestions/' + dataRef[4]);
	ref.remove();
	$('.suggestionEdit').fadeOut(300);
	cloudFunctions(urlBackendSugestaoAdicionada, {commandName: dataRef[0], userEmail: dataRef[1]});
	 
	showSnackBar("Confirmação de adição enviada");
	writeOnLog("Confirmou a inserção da sugestão: "+ dataRef[0]);
}

$('.buttonEditSuggestion').mouseenter(function(){
	$('.actionEditIndicator').css('display','block');
	
	$('.actionEditIndicator').html('<div class="mdc-chip__text">'+$(this).attr('name')+'</div>');
});

$('.buttonEditSuggestion').mouseleave(function(){
	$('.actionEditIndicator').css('display','none');
});

function listEmpty(){
	if($('#my-list li').length == 0){
		$('#my-list').append(" <li class='mdc-list-item suggestionItem  mdc-list--avatar-list' id='listEmptyLi'> <span class='mdc-list-item__graphic' role='presentation'> <i class='material-icons' aria-hidden='true'>info</i> </span> <span class='mdc-list-item__text'> <span class='mdc-list-item__primary-text'>Não há sugestões.</span> <span class='mdc-list-item__secondary-text'>Aproveite para descansar</span> </span> </li>").fadeIn(300);
	}else{
		$("#listEmptyLi").remove();
	}
}