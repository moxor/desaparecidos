$(function() {
  $(window).resize(function() {
    var calculateHeight=window.innerHeight - 82 - 45;
    if (calculateHeight<=40)calculateHeight=300;
    if (window.innerWidth <=650)$('#map').css('width', "90%");
    else $('#map').css('width', "75%");
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
Router.map(function(){
  this.route('home', {path: '/',

    data: function() {
      return {
        images: Images.find({})
      };
    }
  } );
  this.route('test', {path: '/test'});
  this.route('admin', {
    path: '/admin_dash',

    onBeforeAction: function() {
      user = Meteor.user();
      if(!Roles.userIsInRole(user, ['admin'])) {
        this.redirect('home');
        this.stop();
      }
      return true;
    }});
});
