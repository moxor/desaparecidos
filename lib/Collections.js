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
        return false;
    },
    download: function() {
        return true;
    }
});
var Schemas = {};

Schemas.Case = new SimpleSchema({
    //some initial values:
    author: {
        type: String,
        label: "Author",
        optional: true,
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
    titel: {
        type: String,
        label: "Titulo",
        optional: false,
        index: 3
    },
    location: {
        type: String,
        label: "Where did it happen?",
        optional: false,
        index: 4,
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
        optional: false,
        index: 5,

        defaultValue: function() {
            var tmp=Session.get("createCoords");
            if (tmp==undefined)return"";
            return tmp.latlng.lat.toString();
        }

    },
    long: {
        type: String,
        label: "longitude",
        optional: false,
        index: 6,

        defaultValue: function() {
            var tmp2=Session.get("createCoords");
            if (tmp2==undefined)return"";
            return tmp2.latlng.lng.toString();
        }

    },
    dateCase: {
        type: String,
        label: "When did it happen?",
        index: 7,
        optional: false
    },

    deaths: {
        type: Number,
        label: "Number of Deaths",
        optional: true,
        min: 0,
        defaultValue: 0,
        index: 8
    },
    desaparecidos: {
        type: Number,
        label: "No. of desaparecidos",
        optional: true,
        min: 0,
         defaultValue: 0,
        index: 9
    },

    description: {
        type: String,
        label: "Description",
        optional: true,
        max: 1000,
        index: 10,
        autoform: {
              afFieldInput: {
                type: "textarea"
              }
        }
    },
    tags: {
        type: Array,
        optional: true,
        index: 11,
        label: "Tags"
  
    },
    "tags.$": {
        type: Object,
    },
    "tags.$.tag":{
        type: String,
        label:"Tag",
        max: 1000
    },
    persons: {
      type: Array,
      label:"Desaparecido",
      optional:true,
      index:12,
      minCount: 0
    },
    "persons.$":{
        type: Object
    },
    "persons.$.name":{
        type: String,
        label:"Nombre",
        max: 1000
    },
    "persons.$.birthdate": {
        type: String,
        label: "Fecha de nacimiento",
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker",
                datePickerOptions: function () {
                    return {
                      autoclose: true
                    }
                    
                }
            }
        }
    },
    "persons.$.gender": {
        type: String,
        allowedValues: ['Male', 'Female'],
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label:"Hombre",value:"Male"},
                    {label:"Mujer", value:"Female"}
                ];
            }
        }
    },
    
    news_source: {
        type: Array,
        label: "Fuentes de prensa",
        optional: true,
        minCount: 0,
        maxCount: 4,
        index: 13},
        
    "news_source.$": {
      type: String,
      optional: true,
      max:1000
    },
    source_pgr: {
        type: String,
        label: "Fuente de http://www.pgr.gob.mx/SPDA/",
        optional: true,
        max: 1000,
        index: 14
    },
    picture: {
        type: String,
        optional: true,
        index: 15,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        }
    }


});
    
Case = new Meteor.Collection("cases");
Case.attachSchema(Schemas.Case);
