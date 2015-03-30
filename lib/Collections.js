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
    date: {
        type: Date,
        label: "When did it happen?",
        index: 7,
        optional: false,
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker",
            }
        }
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
        index: 10
    },
    tags: {
        type: String,
        optional: false,
        index: 11,
        label: "Tags",
        autoform: {
          type: "select-checkbox-inline",
          options: function () {
            return [
                {label: "Desaparición Forzada", value: "Desaparición Forzada"},
                {label: "Desaparición", value: "Desaparición"},
                {label: "Periodistas", value: "Periodistas"},
                {label: "Mujeres 18-59 años", value: "Mujeres 18-59 años"},
                {label: "Alerta Amber", value: "Alerta Amber"},
                {label: "Personas Localizadas sin vida", value: "Personas Localizadas sin vida"},
                {label: "Denuncia Ciudadana", value: "Denuncia Ciudadana"},
                {label: "Activistas", value: "Activistas"},
                {label: "Mujeres 13-17 años", value: "Mujeres 13-17 años"},
                {label: "Niñas 0-12 años", value: "Niñas 0-12 años"},
                {label: "Mujeres Más de 60 años", value: "Mujeres Más de 60 años"},
                {label: "Niños 0-12 años", value: "Niños 0-12 años"},
                {label: "Hombres 13-17 años", value: "Hombres 13-17 años"},
                {label: "Hombres 18-59 años", value: "Hombres 18-59 años"},
                {label: "Sustracción Parental", value: "Sustracción Parental"},
                {label: "Hombres más de 60 años", value: "Hombres más de 60 años"},
                {label: "Sin progresión de edad", value: "Sin progresión de edad"},
                {label: "Personas Localizadas con vida", value: "Personas Localizadas con vida"},
                {label: "Migrantes centroamericanos", value: "Migrantes centroamericanos"},
                {label: "Extranjeros", value: "Extranjeros"},
                {label: "Cooperación con IINTERPOL", value: "Cooperación con IINTERPOL"}
            ];
          }
        }
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
        type: Date,
        label: "Fecha de nacimiento",
        autoform: {
            afFieldInput: {
                type: "bootstrap-datepicker"
            }
        }
    },
    
    news_source: {
        type: Array,
        label: "Fuentes de prensa",
        minCount: 1,
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
