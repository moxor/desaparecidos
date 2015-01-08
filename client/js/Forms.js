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
        Session.set("showCreateDialog", false);
        $('.bootstrap-datetimepicker-widget').remove();
    },

    'click .cancel': function () {
        Session.set("showCreateDialog", false);
        $('.bootstrap-datetimepicker-widget').remove();
    }
});
/////////////////////////////////////////////////
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
////////////////////////////////////////////////
Template.errorMessage.events({

    'click .cancel': function () {
        Session.set("showError", false);
    }
});
Template.errorMessage.helpers({

    errorMessage: function () {

        return Session.get("showError").Message;

    }
});
/////////////////////////////////////////////////
AutoForm.hooks({
    insertDesaparecidosForm: {
        onSuccess: function (operation, result, template) {
            sendEmail(result);
            Session.set("activado_desaparecidos",result);
            //console.log(event.target.options._id);
            var constClass="."+result;
            $('.selecteded').toggleClass("selecteded");
            $(constClass).addClass("selecteded");
            Session.set("showCreateDialog", false);
        }



    }
});
var sendEmail= function(result){
    Meteor.call('sendEmail',
        'Hello from Desaparecidos!',
        'Hey there!\nYou have entered a new desaparecido:\n'+Desaparecidos.findOne(result).stringify()
    );
};
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