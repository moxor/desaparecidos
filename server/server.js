var debugg=false;
Meteor.publish("markers", function () {
  return Markers.find();
});
Meteor.publish(null, function (){
  return Meteor.roles.findOne(this.userId);
});
Meteor.publish("desaparecidos", function () {
  return Desaparecidos.find();
});
Meteor.publish('images', function() {
  return Images.find();
});
//if (Desaparecidos.find().lat==undefined)Desaparecidos.remove();

var geo = new GeoCoder({
  geocoderProvider: "openstreetmap",
  httpAdapter: "http"
});
Meteor.methods({
  get_city: function(latlng) {
    var geo2 = new GeoCoder({
      geocoderProvider: "openstreetmap",
      httpAdapter: "http"
    });
    console.log("Lookupcity");
    if (!debugg)var result2 = geo2.reverse(latlng.lat,latlng.lng);
    else var result2={city:""};
    //console.log(result2[0]);
    if (result2[0].city!=undefined) return result2[0].city;
    return "";
  },
  get_country: function(latlng) {
    try {
    var geo2 = new GeoCoder({
      geocoderProvider: "openstreetmap",
      httpAdapter: "http"
    });
    console.log("lookupCountryCode ");


      var result2 = geo2.reverse(latlng.lat,latlng.lng);
      if (result2[0].countryCode!=undefined) return result2[0].countryCode;
    }
    catch (e){return "sea";}

  },
  get_country_long: function(latlng) {
    var geo2 = new GeoCoder({
      geocoderProvider: "openstreetmap",
      httpAdapter: "http"
    });
    console.log("lookupCountry");
    if (!debugg)var result2 = geo2.reverse(latlng.lat,latlng.lng);
    else var result2={country:"mx"};
    if (result2[0].country!=undefined) return result2[0].country;
    return "SEA";
  }
});
FS.HTTP.setBaseUrl('/files');