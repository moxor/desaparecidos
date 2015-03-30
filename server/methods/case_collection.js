//Case
Meteor.publish("cases", function () {
  if (Roles.userIsInRole(this.userId, ['view-secrets','admin'])) {
    return Case.find()
    
  };
  return Case.find({$or: [ { 'author':this.userId }, {'approved':true} ]}, {fields: {'author':0,'approved':0,'entrydate':0}});
});

Meteor.publish("approved", function () {
  if (Roles.userIsInRole(this.userId, ['view-secrets','admin'])) {
    return Approved.find()
    
  };
  return Approved.find( { 'author':this.userId }, {});
});
Case.allow({
  
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },
    'update':function () {
     return (userId && Meteor.users(userId).admin);}
  });
