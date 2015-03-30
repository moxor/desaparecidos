
/**
* Created by nanu on 08.01.15.
*/
Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://postmaster%40www.desaparecidosmx.org:a086098b554a20c6e069a166a2a6773f@smtp.mailgun.org:587';
});
AdminConfig = {
  adminEmails: ['aaron@kimmigs.de'],
  collections: {
    Case: {}
  }
};