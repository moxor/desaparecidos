

//Publishing Rules
//User
Meteor.publish(null, function (){
  return Meteor.roles.findOne(this.userId);
});
//Images
Meteor.publish('images', function() {
  return Images.find();
});

FS.HTTP.setBaseUrl('/files');