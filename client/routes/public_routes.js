/**
 * Created by nanu on 07.01.15.
 */
Router.route('/test',function () {
    this.layout('page_template');
    this.render('test',{to: 'content'});
});
Router.route('/new_template',function () {
    this.layout('new_main');
});
Router.route('/desaparecido/:_id', function () {
    this.layout('page_template', {
        data: function () {
            console.log(this.params);
            return Desaparecidos.findOne({_id: this.params._id});
        }
    });
    this.render('desaparecidoPage', {to: 'content'});
});

Router.route("/",function() {
    this.layout(  'page_template', {
        data: function() {
            return {
                images: Images.find({})
            };
        }
    } );
    this.render('main_template', {to: 'content'});
});