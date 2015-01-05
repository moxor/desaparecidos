/**
 * Created by nanu on 20.12.14.
 */
Template.new_desaparecido.helpers({
    lat:function(){
        var tmp=Session.get("createCoords");
        if (tmp==undefined)return"";
        return tmp.latlng.lat.toString();
    },
    long:function(){
        var tmp=Session.get("createCoords");
        if (tmp==undefined)return"";
        return tmp.latlng.lat.toString();
    }

});
Template.new_desaparecido.rendered=function(){
    $('.datepick').datetimepicker();
};

Template.createDialog.events({
    'click .save': function (event, template) {
        Markers.insert(Session.get("createCoords"));
        Session.set("showCreateDialog", false);
        $('.bootstrap-datetimepicker-widget').remove();
    },

    'click .cancel': function () {
        Session.set("showCreateDialog", false);
        $('.bootstrap-datetimepicker-widget').remove();
    }
});
Template.errorCountry.events({

    'click .cancel': function () {
        Session.set("showErrorCountry", false);
    }
});
Template.errorCountry.helpers({

    country: function () {

        Meteor.call("get_country_long", Session.get("createCoords").latlng, function(error, country) {Session.set("country", country);
        });

        return Session.get("country");

    }
});
AutoForm.hooks({
    insertDesaparecidosForm: {
        onSuccess: function (operation, result, template) {
            Markers.insert(Session.get("createCoords"));
            Session.set("showCreateDialog", false);
            console.log("onSuccess on all input/update/method forms!");
        }



    }
});
AutoForm.hooks({
    insertDesaparecidosForm: {

        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            console.log("hey");
            if (customHandler(insertDoc)) {
                this.done();
            } else {
                this.done(new Error("Submission failed"));
            }
            return false;
        }
    }
});