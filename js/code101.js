drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

$('.mdc-list-item').focus(function(){
	this.blur();
});

// ################ FIREBASE USER CONFIGS #######################

//  SIGN IN USER 
function login(){
	let email = $("#userEmail").val();
	let password = $("#userPassword").val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorMessage = error.message;
		console.log(errorMessage);	
	  });
}

// VERIFY IF USER IS LOGGED
function initApp(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			setUserHeader();
			$('.mdc-drawer__content').css('opacity',1);
			$("#pageContent").load("tabs/dashboard.html");
			
		} else {
			$('.mdc-drawer__content').css('opacity',0);
			$("#pageContent").load("tabs/login.html"); 
		}
	});
}

// CHANGE INFORMATIONS FROM USER IN THE DRAWER HEADER
function setUserHeader(){
	var userId = firebase.auth().currentUser.uid;
	var userNameRef = firebase.database().ref('admin/' + userId + '/name');
	userNameRef.once('value').then(function(snapshot) {
		$(".profileName").text(snapshot.val());
		// ...
	});

	var userPictureRef = firebase.database().ref('admin/' + userId + '/profile');
	userPictureRef.once('value').then(function(snapshot) {
		$(".profileImage").attr('src', snapshot.val());
		// ...
	});
	
}

// ################ SUGGESTIONS.HTML FUNCTIONS ##################

function listSuggestions(){
	let ref = firebase.database().ref('sugestions/');
		ref.on('child_added', function(data) {
		let commandName = data.val().command;
		let languageName = data.val().language;
		$('#my-list').append(" <li class='mdc-list-item suggestionItem  mdc-list--avatar-list' id='"+commandName+"' onclick='viewSuggestion(this.id);'> <span class='mdc-list-item__graphic' role='presentation'> <i class='material-icons' aria-hidden='true'>message</i> </span> <span class='mdc-list-item__text'> <span class='mdc-list-item__primary-text'>"+commandName+"</span> <span class='mdc-list-item__secondary-text'>"+languageName+"</span> </span> </li>").fadeIn(300);
	});

	ref.on('child_removed', function(data) {
		$("#"+ data.val().command).remove().fadeOut(300);;
	});
}

var dataRef = [];

function viewSuggestion(cID){
	let count = 0;
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
	cID = $("#editCommandName").text();
	let ref = firebase.database().ref('sugestions/' + cID);
	$('.suggestionEdit').fadeOut(300);
	ref.remove();
	showSnackBar('Sugestão deletada');
}


function addSuggestion(){
	cID = $("#editCommandName").text();
	let ref = firebase.database().ref('sugestions/' + cID);
	$('.suggestionEdit').fadeOut(300);
	$.ajax({
		type: "post",
		url: "https://us-central1-code101-b884a.cloudfunctions.net/sugestaoAdicionada",
		data: {commandName: dataRef[0], userEmail: dataRef[1]}
	});
	ref.remove();
	showSnackBar("Confirmação de adição enviada");
}
$('.buttonEditSuggestion').mouseenter(function(){
	$('.actionEditIndicator').css('display','block');
	
	$('.actionEditIndicator').html('<div class="mdc-chip__text">'+$(this).attr('name')+'</div>');
});

$('.buttonEditSuggestion').mouseleave(function(){
	$('.actionEditIndicator').css('display','none');
});



// FUNCTIONS FOR ALL THE PAGES

function showSnackBar(message){
	const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
	const dataObj = {
		message: message,
		actionText: 'OK',
		actionHandler: function () {
			console.log('my cool function');
		}
	};
snackbar.show(dataObj);
}

