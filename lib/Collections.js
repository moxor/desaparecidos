/**
 * Created by nanu on 19.12.14.
 */
Images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("images", {path: "~/files"})]
});
Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    download: function() {
        return true;
    }
});
//Markers = new Meteor.Collection('markers');
var Schemas = {};

Schemas.Case = new SimpleSchema({
    //some initial values:
    author: {
        type: String,
        label: "Author",
        optional: false,
        index: 0,
        autoValue:function(){ return this.userId }

    },
    approved: {
        type: Boolean,
        label: "",
        optional: false,
        index: 1,
        autoValue:function(){ return true }

    },
    entrydate: {
        type: Date,
        label: "",
        optional: false,
        index: 2,
        autoValue:function(){ return new Date() }

    },

    location: {
        type: String,
        label: "Where did it happen",
        index: 3,
        defaultValue: function() {
            var tmp=Session.get("city");
            if (tmp==undefined)return"";
            console.log(tmp);
            return tmp;
        }
    },
    lat: {
        type: String,
        label: "latitude",
        index: 4,

        defaultValue: function() {
            var tmp=Session.get("createCoords");
            if (tmp==undefined)return"";
            return tmp.latlng.lat.toString();
        }

    },
    long: {
        type: String,
        label: "longitude",
        index: 5,

        defaultValue: function() {
            var tmp2=Session.get("createCoords");
            if (tmp2==undefined)return"";
            return tmp2.latlng.lng.toString();
        }

    },

    deaths: {
        type: Number,
        label: "Number of Deaths",
        optional: true,
        min: 0,
        index: 6
    },
    desaparecidos: {
        type: Number,
        label: "No. of desaparecidos",
        optional: true,
        min: 0,
        index: 7
    },
    date: {
        type: String,
        label: "When did it happen?",
        index: 8
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000,
        index: 9
    },
    source: {
        type: String,
        label: "List a source like newspaper articels",
        optional: true,
        max: 1000,
        index: 10
    },
     source_pgr: {
        type: String,
        label: "Fuente de http://www.pgr.gob.mx/SPDA/",
        optional: true,
        max: 1000,
        index: 11
    },
    picture: {
        type: String,
        optional: true,
        index: 12,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }
    },
    name:{
        type: String,
        label: "Nombre",
        optional: true,
        max: 1000,
        index: 9
    },
    birthdate: {
        type: Date,
        label: "",
        optional: true,
        index: 2

    },

});
Case = new Meteor.Collection("cases");
Case.attachSchema(Schemas.Case);