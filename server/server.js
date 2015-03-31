
  Meteor.startup(function () {
  if (Tags.find().count()===0){
    Tags.insert({value:"Desaparición Forzada"});
    Tags.insert({value:"Desaparición"});
    Tags.insert({value:"Periodistas"});
    Tags.insert({value:"Mujeres 18-59 años"});
    Tags.insert({value:"Alerta Amber"});
    Tags.insert({value:"Personas Localizadas sin vida"});
    Tags.insert({value:"Denuncia Ciudadana"});
    Tags.insert({value:"Activistas"});
    Tags.insert({value:"Mujeres 13-17 años"});
    Tags.insert({value:"Niñas 0-12 años"});
    Tags.insert({value:"Mujeres Más de 60 años"});
    Tags.insert({value:"Niños 0-12 años"});
    Tags.insert({value:"Hombres 13-17 años"});
    Tags.insert({value:"Hombres 18-59 años"});
    Tags.insert({value:"Sustracción Parental"});
    Tags.insert({value:"Hombres más de 60 años"});
    Tags.insert({value:"Sin progresión de edad"});
    Tags.insert({value:"Personas Localizadas con vida"});
    Tags.insert({value:"Migrantes centroamericanos"});
    Tags.insert({value:"Extranjeros"});
    Tags.insert({value:"Cooperación con IINTERPOL"});
  }
  });


//Publishing Rules
//User
Meteor.publish(null, function (){
  return Meteor.roles.findOne(this.userId);
});
//Images
Meteor.publish('images', function() {
  return Images.find();
});
Meteor.publish('tags', function() {
  return Tags.find();
});
Tags.permit(['insert', 'update', 'remove']).ifHasRole('admin').apply();
FS.HTTP.setBaseUrl('/files');

Houston.add_collection(Case);

Houston.add_collection(Tags);
Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);