$(function() {
  $(window).resize(function() {
    var calculateHeight=window.innerHeight - 82 - 45;
    if (calculateHeight<=40)calculateHeight=300;
    if (window.innerWidth <=650)$('#map').css('width', "100%");
    //else $('#map').css('width', "75%");
    console.log(window.innerWidth );
    $('#map').css('height', calculateHeight +" !important");
    $('.selected_desaparecido').css('height', window.innerHeight - 82 - 45);
  });
  $(window).resize(); // trigger resize event
});
Router.configure({
  layoutTemplate: "home",
  waitOn: function() {
    return Meteor.subscribe("images");
  }
});




Accounts.validateLoginAttempt(function(type){

  if(type.user && type.user.emails && !type.user.emails[0].verified )
    throw new Meteor.Error(100002, "email not verified" );
  return true;
});

