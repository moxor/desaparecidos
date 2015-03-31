var Schemas = {};
Schemas.Tags= new SimpleSchema({
    value:{
        type: String,
        label: "Tag",
        optional: false,

    },
});
Tags = new Meteor.Collection("tags");
Tags.attachSchema(Schemas.Tags);