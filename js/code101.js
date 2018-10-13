drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));


window.onload = function() {
	initApp();
  };

// #### FIREBASE LOGIN SERVICES #######

//SIGN IN USER
function login(){
	let email = $("#userEmail").val();
	let password = $("#userPassword").val();
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorMessage = error.message;
		console.log(errorMessage);	
	  });
}

// VERIFY IF USER ARE LOGGED
function initApp(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			$('.mdc-drawer__content').css('opacity',1);
			$("#pageContent").load("dashboard.html");
			setUserHeader();

		} else {
			$('.mdc-drawer__content').css('opacity',0);
			$("#pageContent").load("login.html"); 
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

$('.mdc-list-item').focus(function(){
	this.blur();
});