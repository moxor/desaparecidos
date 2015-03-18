Template.cases.helpers({
    Case: function () {
        return Case;
    },
    tableSettings : function () {
      return {
          fields: [
            { key: 'picture', label: 'Imagen',tmpl: Template.cases_image }, 
            { key: 'location', label: 'Localidad' },
            { key: 'name', label: 'Nombre' },
            { key: 'date', label: 'Fecha', sort: 'descending'}
          ]
      }
    }
});
Template.cases_image.helpers({
    link: function () {
        if(Case.findOne(Session.get("activado_desaparecidos"))) {
            if (Case.findOne(Session.get("activado_desaparecidos")).picture)
            return Images.findOne(Case.findOne(Session.get("activado_desaparecidos")).picture).url();
        }
        return "/images/nomas.jpg";
    },
});
Template.cases.events({
  'click .reactive-table tbody tr': function (event) {
    var post = this;
    console.log(post._id);
    window.location.href = "http://"+window.location.host+"/desaparecido/"+post._id;
  }
});