// create marker collection

AutoForm.debug();
Meteor.subscribe('markers');
Meteor.subscribe('desaparecidos');
Session.set("desaparecidos", 0);
Session.set("deaths", 0);
FS.HTTP.setBaseUrl('/files');

Template.home.helpers({
    showCreateDialog:function () {
      return Session.get("showCreateDialog");
    },
    showErrorCountry:function () {
    return Session.get("showErrorCountry");
  }

});



