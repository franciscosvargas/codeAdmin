window.mdc.autoInit();

function sendEmail(){
    cloudFunctions(urlBackendSendEmail, {subject: $("#tituloEmail").val(), body: $("#textareaCorpoEmail").val(), uid: firebase.auth().currentUser.uid});
    showSnackBar("Email enviado");
    $("#tituloEmail").val("");
    $("#textareaCorpoEmail").val("");
}