/**
 * Created by nanu on 20.12.14.
 */
Template.selected_desaparecido.helpers({
   ciudad:function(){
       if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))){
       if (!Session.get("activado_desaparecidos")||!Desaparecidos.findOne(Session.get("activado_desaparecidos")).location)return "";
       return Desaparecidos.findOne(Session.get("activado_desaparecidos")).location;}
       return "";
   },
    fecha:function(){
        if (Session.get("activado_desaparecidos")){
            console.log(Desaparecidos.findOne(Session.get("activado_desaparecidos")).date)
        return moment(Desaparecidos.findOne(Session.get("activado_desaparecidos")).date).format('MM/DD/YYYY');

        }

        return "";
    },
    muertos:function(){
        if (Session.get("activado_desaparecidos")){
        if ( Desaparecidos.findOne(Session.get("activado_desaparecidos")).deaths!=undefined)
            return Desaparecidos.findOne(Session.get("activado_desaparecidos")).deaths;}
        return "";
    },
    desaparecidos:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
          return Desaparecidos.findOne(Session.get("activado_desaparecidos")).desaparecidos;
        }
        return "";
    },
    informaciones:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
            return Desaparecidos.findOne(Session.get("activado_desaparecidos")).summary;
        }
        return "";
    },
    selected:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))){
        if (Session.get("activado_desaparecidos"))return true;}
        return false;
    },
    author:function() {
        if (Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
            if (Desaparecidos.findOne(Session.get("activado_desaparecidos")).author === Meteor.userId())return true;
        }
        return false;
    },
    picture:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
            if (Desaparecidos.findOne(Session.get("activado_desaparecidos")).picture)
            return Images.findOne(Desaparecidos.findOne(Session.get("activado_desaparecidos")).picture).url();
        }
        return "/images/nomas.jpg";
    },
    fuente:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
            if (Desaparecidos.findOne(Session.get("activado_desaparecidos")).source)
                return Desaparecidos.findOne(Session.get("activado_desaparecidos")).source;
        }
        return "";
    },
    checkFuente:function(){
        if(Desaparecidos.findOne(Session.get("activado_desaparecidos"))) {
            if (Desaparecidos.findOne(Session.get("activado_desaparecidos")).source)
                return true;
        }
        return false;
    },
    get_link:function(){
        return "desaparecido/"+Session.get("activado_desaparecidos");
    }


});
Template.selected_desaparecido.events({
   'click .remove': function () {
       Desaparecidos.remove({_id:Session.get("activado_desaparecidos")});
       Session.set("activado_desaparecidos", null);

    },
    'click .modify': function () {
        ({_id:Session.get("activado_desaparecidos")});
        Session.set("activado_desaparecidos", null);
    }
});
Images.allow({
    insert: function(userId, doc) {
        return true;
    },
    download: function(userId) {
        return true;
    }
});