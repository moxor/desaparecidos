Template.cases.helpers({
    Case: function () {
        return Case;
    },
    tableSettings : function () {
      return {
          fields: [
            { key: 'picture', label: 'Imagen',tmpl: Template.cases_image }, 
            { key: 'titel', label: 'Nombre' },
            { key: 'location', label: 'Localidad' },
            { key: 'dateCase', label: 'Fecha', sort: 'descending',tmpl: Template.cases_dateCase},
            { key: 'deaths', label: 'Muertos' },
            { key: 'desaparecidos', label: 'Desaparecidos' }
          ]
      }},
      tableSettingsAdmin: function () {
        return {
            fields: [
              { key: 'picture', label: 'Imagen',tmpl: Template.cases_image }, 
              { key: 'titel', label: 'Nombre' },
              { key: 'location', label: 'Localidad' },
              { key: 'dateCase', label: 'Fecha', sort: 'descending'},
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
        if(this.picture!=undefined) {

            return this.picture;
        }
        return "/images/nomas.jpg";
    },
});
Template.cases_dateCase.helpers({
    get_date: function () {
        if(this.dateCase!=undefined) {

            return moment(this.dateCase).format("YYYY/MM/DD");
        }
        return "";
    },
});

Template.cases.events({
  'click .reactive-table tbody tr': function (event) {
    var post = this;
    console.log(post._id);
    window.location.href = "http://"+window.location.host+"/desaparecido/"+post._id;
  }
});