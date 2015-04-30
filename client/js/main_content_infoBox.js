/**
 * Created by nanu on 20.12.14.
 */
Template.caseData.helpers({
   ciudad:function(){
       if(Case.findOne(Session.get("selected_case"))){
       if (!Session.get("selected_case")||!Case.findOne(Session.get("selected_case")).location)return "";
       return Case.findOne(Session.get("selected_case")).location;}
       return "";
   },
    fecha:function(){
        if (Session.get("selected_case")){
            //console.log(Case.findOne(Session.get("selected_case")).date)
        return moment(Case.findOne(Session.get("selected_case")).dateCase).format('MM/DD/YYYY');

        }

        return "";
    },
    muertos:function(){
        if (Session.get("selected_case")){
        if ( Case.findOne(Session.get("selected_case")).deaths!=undefined)
        
            return Case.findOne(Session.get("selected_case")).deaths;
            
        }
        return "0";
    },
    desaparecidos:function(){
        if(Case.findOne(Session.get("selected_case"))) {
          return Case.findOne(Session.get("selected_case")).desaparecidos+1;
        }
        return "";
    },
    informaciones:function(){
        if(Case.findOne(Session.get("selected_case"))) {
            return Case.findOne(Session.get("selected_case")).summary;
        }
        return "";
    },
    selected:function(){
        if(Case.findOne(Session.get("selected_case"))){
        if (Session.get("selected_case"))return true;}
        return false;
    },
    author:function() {
        if (Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).author === Meteor.userId())return true;
        }
        return false;
    },
    picture:function(){
        if(Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).picture)
            return Case.findOne(Session.get("selected_case")).picture
            //Images.findOne(Case.findOne(Session.get("selected_case")).picture).url();
        }
        return "/images/nomas.jpg";
    },
    fuente:function(){
        if(Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).source)
                return Case.findOne(Session.get("selected_case")).source;
        }
        return "";
    },
    checkFuente:function(){
        if(Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).source)
                return true;
        }
        return false;
    },
    get_link:function(){
        return "desaparecido/"+Session.get("selected_case");
    }


});
Template.caseData.events({
   'click .remove': function () {
       Case.remove({_id:Session.get("selected_case")});
       Session.set("selected_case", null);

    },
    'click .modify': function () {
        ({_id:Session.get("selected_case")});
        Session.set("selected_case", null);
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
        if(Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).picture)
                return Images.findOne(Case.findOne(Session.get("selected_case")).picture).url();
        }
        return "/images/nomas.jpg";
    }
});