const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

let url = "smtps://code101.mail%40gmail.com:"+encodeURIComponent('codeadmin') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);
admin.initializeApp();


exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let remetente = '"code101" code101.mail@gmail.com';
	var destinatarios;
    let assunto = req.body['subject'];
    let corpo = req.body['commandDescription'];

    
	
    var count = 0;
    var verifi;
	admin.database().ref(`/emails/`).orderByValue().on("value", function(snapshot) {
  		snapshot.forEach(function(data) {
          destinatarios = data.val();
          
          let email = {
              from: remetente,
              to: destinatarios,
              subject: assunto,
              text: assunto,
              html: corpo
          };

          transporter.sendMail(email, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Mensagem %s enviada: %s', info.messageId, info.response);

            });
          
          })
  		});
    
    if(count == 0){
    	return admin.database().ref(`/emails/`).push().set(destinatarios);
    }
   
    res.status(200).send('sucess'); 
  });
});

