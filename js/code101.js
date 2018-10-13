drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

chamalogin();

function chamalogin(){
	$('.mdc-drawer__content').css('opacity',0);
	$("#pageContent").load("login.html"); 

}

$('.mdc-list-item').focus(function(){
	this.blur();
});

