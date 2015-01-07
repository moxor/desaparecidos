/**
 * Created by nanu on 07.01.15.
 */
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
    this.render('desaparecidoPage', {to: 'content'});
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