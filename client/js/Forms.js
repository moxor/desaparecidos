/**
 * Created by nanu on 20.12.14.
 *
 * This file is for the new Data-Form
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
    },
      tagsOptions: function () {
      return Tags.find().map(function (c) {
      return {label: c.value, value: c._id};
    });
  }

});
Template.new_desaparecido.rendered=function(){
    $('.datepick').datetimepicker();
};

Template.createDialog.events({
    'click .save': function (event, template) {
        Session.set("showCreateDialog", false);
    },

    'click .cancel': function () {
        Session.set("showCreateDialog", false);
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
        $("ui-datepicker-div").remove();
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
            $("ui-datepicker-div").remove();
            Session.set("selected_case",result);
            console.log(result);
            var constClass="."+result;
            $('.selecteded').toggleClass("selecteded");
            $(constClass).addClass("selecteded");
            Session.set("showCreateDialog", false);
        }



    }
});

//TODO add global variable for server url
var sendEmail= function(result){
    Meteor.call('sendEmail',
        'Hello from Desaparecidos!',
        'There is a new desaparecido to approve.\nLink:\n http:\/\/www.desaparecidosmx.org/desaparecido/'+Case.findOne(result)._id+'/modify'
    );
};
AutoForm.hooks({
    insertDesaparecidosForm: {

        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            if (customHandler(insertDoc)) {
                this.done();
            } else {
                this.done(new Error("Submission failed"));
            }
            return false;
        }
    }
});