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
            { key: 'date', label: 'Fecha', sort: 'descending'},
            { key: 'deaths', label: 'Muertos' },
            { key: 'desaparecidos', label: 'Desaparecidos' }
          ]
      }},
      tableSettingsAdmin: function () {
        return {
            fields: [
              { key: 'picture', label: 'Imagen',tmpl: Template.cases_image }, 
              { key: 'location', label: 'Localidad' },
              { key: 'name', label: 'Nombre' },
              { key: 'date', label: 'Fecha', sort: 'descending'},
              { key: 'deaths', label: 'Muertos' },
              { key: 'desaparecidos', label: 'Desaparecidos' },
              { key: 'approved', label: 'Approved' },
              { key: '_id', label: 'Modify',tmpl: Template.cases_modify }
            ]
        }
    }
});
Template.cases_image.helpers({
    link: function () {
        if(Case.findOne(Session.get("selected_case"))) {
            if (Case.findOne(Session.get("selected_case")).picture)
            return Images.findOne(Case.findOne(Session.get("selected_case")).picture).url();
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