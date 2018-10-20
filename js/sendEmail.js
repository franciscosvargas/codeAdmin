window.mdc.autoInit();

function sendEmail(){
    var sendEmail = firebase.functions().httpsCallable('sendEmail');
    sendEmail({assunto: $("#tituloEmail").val(), corpo: $("#textareaCorpoEmail").val()}).then(function(result) {
    showSnackBar('Email enviado');
});
    $("#tituloEmail").val("");
    $("#textareaCorpoEmail").val("");
}