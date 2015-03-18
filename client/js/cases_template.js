Template.cases.helpers({
    Case: function () {
        return Case;
    },
    tableSettings : function () {
      return {
          fields: [
            { key: 'picture', label: 'Imagen' }, 
            { key: 'location', label: 'Localidad' },
            { key: 'name', label: 'Nombre' },
            { key: 'date', label: 'Fecha', sort: 'descending'}
          ]
      }
    }
});
Template.cases.events({
  'click .reactive-table tr': function (event) {
    var post = this;
    console.log(post._id);
    window.location.href = "http://"+window.location.host+"/desaparecido/"+post._id;
  }
});