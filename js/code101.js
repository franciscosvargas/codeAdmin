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
	});

	var userPictureRef = firebase.database().ref('admin/' + userId + '/profile');
	userPictureRef.once('value').then(function(snapshot) {
		$(".profileImage").attr('src', snapshot.val());
	});
	
}

// SHOW SNACKBAR WITH MESSAGE
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

function writeOnLog(message){
	cloudFunctions(urlBackendWriteOnLog, {'username': firebase.auth().currentUser.uid, 'action': message});
}

function cloudFunctions(url, data){
	$.ajax({
		type: "post",
		url: url,
		data: data
	});
}

var urlBackendSugestaoAdicionada = "https://us-central1-code101-b884a.cloudfunctions.net/sugestaoAdicionada";
var urlBackendWriteOnLog = "https://us-central1-code101-b884a.cloudfunctions.net/writeOnLog";
