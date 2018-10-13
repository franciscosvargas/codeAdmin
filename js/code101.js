drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

$('.mdc-list-item').focus(function(){
	this.blur();
})