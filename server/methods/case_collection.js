//Case-Collection
//publish

Meteor.publish("cases", function () {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Case.find()
    
  };
  return Case.find({$or: [ { 'author':this.userId }, {'approved':true} ]}, {fields: {'author':0,'approved':0,'entrydate':0}});
});
//Security section
Case.permit(['insert', 'update', 'remove']).never().apply();
Case.permit('insert').ifLoggedIn().apply
Case.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
Case.allow({
    'update':function () {
     return (userId && Meteor.users(userId).admin);},
     'remove':function () {
     return (userId && Meteor.users(userId).admin);}
  });
  
Meteor.methods({
    'insertCaseData': function(){
        var currentUserId = Meteor.userId();
    }
});