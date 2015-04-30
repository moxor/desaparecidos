/**
 * Created by nanu on 07.01.15.
 */
Router.route('/about',function () {
    this.layout('page_template');
    this.render('about',{to: 'content'});
});
Router.route('/desaparecidos',function () {
    this.layout('page_template');
    this.render('cases',{to: 'content'});
});
Router.route('/new_template',function () {
    this.layout('new_main');
});
Router.route('/desaparecido/:_id', function () {
    this.layout('page_template', {
        data: function () {

            return Case.findOne({_id: this.params._id});
        }
    });
    this.render('desaparecidoPage', {to: 'content'});
});
Router.route('/desaparecido/:_id/modify', function () {
    this.layout('page_template', {
        data: function () {
            return Case.findOne({_id: this.params._id});
        }
    });
    this.render('Case_modify', {to: 'content'});
});

Router.map(function(){
    this.route('main_template', {
        path:'/',
      waitOn: function() {
        return Meteor.subscribe('cases');
      },
      data: function () {
        templateData = { authors: Case.find() };
        return templateData;
      },
    yieldTemplates: {
        'main_template': {to: 'content'}
  }
    });
});
