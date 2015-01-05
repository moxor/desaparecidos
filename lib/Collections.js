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
Markers = new Meteor.Collection('markers');
var Schemas = {};

Schemas.Desaparecido = new SimpleSchema({
    location: {
        type: String,
        label: "Where did it happen",
        index: 2,
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
        index: 9,

        defaultValue: function() {
            var tmp=Session.get("createCoords");
            if (tmp==undefined)return"";
            return tmp.latlng.lat.toString();
        }

    },
    long: {
        type: String,
        label: "longitude",
        index: 10,

        defaultValue: function() {
            var tmp2=Session.get("createCoords");
            if (tmp2==undefined)return"";
            return tmp2.latlng.lng.toString();
        }

    },
    author: {
        type: String,
        label: "Author",
        optional: false,
        index: 3,
        autoValue:function(){ return this.userId }

    },
    deaths: {
        type: Number,
        label: "Number of Deaths",
        optional: true,
        min: 0,
        index: 4
    },
    desaparecidos: {
        type: Number,
        label: "No. of desaparecidos",
        optional: true,
        min: 0,
        index: 5
    },
    date: {
        type: String,
        label: "When did it happen?",
        index: 1
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000,
        index: 7
    },
    source: {
        type: String,
        label: "List a source like newspaper articels",
        optional: true,
        max: 1000,
        index: 8
    },
    picture: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }
    }

});
Desaparecidos = new Meteor.Collection("desaparecidos");
Desaparecidos.attachSchema(Schemas.Desaparecido);