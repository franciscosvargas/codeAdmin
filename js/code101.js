drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

// ################ FIREBASE USER CONFIGS #######################

//  Sign in user
function login(){
	let email = $("#userEmail").val();
	let password = $("#userPassword").val();
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		if (errorCode === 'auth/wrong-password') {
			$("#captionErrorLogin").text('Senha incorreta.');
		  } else if (errorCode === 'auth/user-not-found')  {
			$("#captionErrorLogin").text('Usuário não encontrado.');
		  }	
	  });
}

// Verify user is logged
function initApp(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			setUserHeader();
			$('#topAppBar').css('display','block');
			$("#pageContent").load("tabs/dashboard.html");
		} else {
			$('#topAppBar').css('display','none');
			$("#pageContent").load("tabs/login.html"); 
		}
	});
}

// Change informations from user in the drawer header
function setUserHeader(){
		$(".profileName").text(firebase.auth().currentUser.displayName);
		$(".profileImage").attr('src', firebase.auth().currentUser.photoURL);
}
// Show snackbar with message 
function showSnackBar(message){
	const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
	const dataObj = {
		message: message,
		actionText: 'OK',
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

var urlBackendSendEmail = "https://us-central1-code101-b884a.cloudfunctions.net/sendEmail";
var urlBackendAddedSuggestion = "https://us-central1-code101-b884a.cloudfunctions.net/addedSuggestion";
var urlBackendWriteOnLog = "https://us-central1-code101-b884a.cloudfunctions.net/writeOnLog";
