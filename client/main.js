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

Router.route('/test',function () {
  this.layout('home');
  this.render('test',{to: 'content'});
});
Router.route('/desaparecido/:_id', function () {
  this.layout('home', {
    data: function () {
      console.log(this.params);
      return Desaparecidos.findOne({_id: this.params._id});
    }
  });
  this.render('desaparecido_page', {to: 'content'});
});

  Router.route("/",function() {
    this.layout(  'home', {
      data: function() {
        return {
          images: Images.find({})
        };
      }
    } );
    this.render('startpage', {to: 'content'});
});
desaparecido_page