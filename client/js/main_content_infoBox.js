/**
 * Created by nanu on 20.12.14.
 */
Template.caseData.helpers({
   ciudad:function(){
       if(Case.findOne(Session.get("activado_desaparecidos"))){
       if (!Session.get("activado_desaparecidos")||!Case.findOne(Session.get("activado_desaparecidos")).location)return "";
       return Case.findOne(Session.get("activado_desaparecidos")).location;}
       return "";
   },
    fecha:function(){
        if (Session.get("activado_desaparecidos")){
            console.log(Case.findOne(Session.get("activado_desaparecidos")).date)
        return moment(Case.findOne(Session.get("activado_desaparecidos")).date).format('MM/DD/YYYY');

        }

        return "";
    },
    muertos:function(){
        if (Session.get("activado_desaparecidos")){
        if ( Case.findOne(Session.get("activado_desaparecidos")).deaths!=undefined)
            return Case.findOne(Session.get("activado_desaparecidos")).deaths;}
        return "";
    },
    desaparecidos:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
          return Case.findOne(Session.get("activado_desaparecidos")).desaparecidos;
        }
        return "";
    },
    informaciones:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            return Case.findOne(Session.get("activado_desaparecidos")).summary;
        }
        return "";
    },
    selected:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))){
        if (Session.get("activado_desaparecidos"))return true;}
        return false;
    },
    author:function() {
        if (Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).author === Meteor.userId())return true;
        }
        return false;
    },
    picture:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).picture)
            return Images.findOne(Case.findOne(Session.get("activado_desaparecidos")).picture).url();
        }
        return "/images/nomas.jpg";
    },
    fuente:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).source)
                return Case.findOne(Session.get("activado_desaparecidos")).source;
        }
        return "";
    },
    checkFuente:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).source)
                return true;
        }
        return false;
    },
    get_link:function(){
        return "desaparecido/"+Session.get("activado_desaparecidos");
    }


});
Template.caseData.events({
   'click .remove': function () {
       Case.remove({_id:Session.get("activado_desaparecidos")});
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
Template.caseData.helpers({
    picturelink:function(){
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).picture)
                return Images.findOne(Case.findOne(Session.get("activado_desaparecidos")).picture).url();
        }
        return "/images/nomas.jpg";
    }
});