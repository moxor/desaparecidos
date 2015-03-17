/**
 * Created by nanu on 20.12.14.
 */
var createIcon = function(numbers,id) {
    var className = 'leaflet-div-icon ';
    className += id;
    return L.divIcon({
        iconSize: [30, 30],
        html: '<b>' + numbers + '</b>',
        className: className

    });
}
Template.map.rendered = function() {
    //resize for the map
    $(window).resize(function () {
        var h = $(window).height(), offsetTop = 90; // Calculate the top offset
        $('#map_canvas').css('height', (h - offsetTop));
    }).resize();
    //icons-path
    L.Icon.Default.imagePath = '/images'
    
    //disable zoom on doubleclick for adding a marker
    var map = L.map('map', {
        doubleClickZoom: false
    }).setView([23.3927, -100.6192], 5);

    //define map provider
    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
    
    //add marker to map
    map.on('dblclick', function(event) {
        if(Meteor.user && Meteor.user().emails && !Meteor.user().emails[0].verified )
            Session.set("showError",{Message:"Email not verified, please write Mail to info @ desaparecidosmx.org"});
        else if (Meteor.userId()&&Meteor.user().emails[0].verified ){
            Session.set("createCoords", {latlng: event.latlng ,userid:Meteor.userId()});
            Meteor.call("get_country", event.latlng, function(error, country) {
                Session.set("country",country);
                if (country=="mx")Session.set("showCreateDialog", true);
                else Session.set("showErrorCountry",true);

            });

            Meteor.call("get_city", event.latlng, function(error, city) {
                Session.set("city",city);
            });


        };

    });

    //load markers from the colleection
    var query = Desaparecidos.find();
    var markers=new L.MarkerClusterGroup();
    query.observe({

        added: function(document) {
            //get numbers right
            if (document.desaparecidos != undefined){
                Session.set("desaparecidos",Session.get("desaparecidos")+parseInt(document.desaparecidos));
            }
            if (document.deaths != undefined){
                Session.set("deaths",Session.get("deaths")+parseInt(document.deaths));
            }
            if (document.date != undefined){
                console.log
                if (moment(Session.get("ultimoDato")).diff(document.date,'days')<0||Session.get("ultimoDato")==undefined) Session.set("ultimoDato", document.date);
                if (moment(Session.get("primeroDato")).diff(document.date,'days')>0||Session.get("primeroDato")==undefined) Session.set("primeroDato", document.date);
            }
            var numbers=(document.desaparecidos ? document.desaparecidos :0) + (document.deaths? document.deaths :0) ;
            var latlng={lat:document.lat,lng:document.long};
            if (document.lat==undefined)latlng={lat:0,lng:0};

            //Set marker to map
            var marker = new L.Marker(latlng,{
                _id:document._id +" test",
                icon: createIcon(numbers?numbers:"0",document._id)
            });
            marker.on('click', function(event) {
                    var constClass="."+document._id;
                    //console.log(event.target.options._id);
                    $('.selecteded').toggleClass("selecteded");
                    $(constClass).addClass("selecteded");

                    Session.set("activado_desaparecidos",document._id);
                });
            markers.addLayer(marker);
            markers.on('click', function (a) {
            console.log('marker ' + a.layer);
            });
            markers.on('click', function (a) {
                console.log('marker ' + a.layer);
            });

            map.removeLayer(markers);
            map.addLayer(markers);
            $('.'+document._id).addClass("visible");
            if (document.date != undefined) {
                var value=moment(document.date).format('MM_DD_YYYY');
                $('.' + document._id).attr('id',"d_"+value);
                console.log(value);
            }

        },

        removed: function(oldDocument) {
            //get the numbers right
            if (oldDocument.desaparecidos){
                Session.set("desaparecidos",Session.get("desaparecidos")-parseInt(oldDocument.desaparecidos));
            }
            if (oldDocument.deaths){
                Session.set("deaths",Session.get("deaths")-parseInt(oldDocument.deaths));
            }
            //delete the markers
            layers = map._layers;
            var key, val;
            for (key in layers) {
                val = layers[key];

                if (val._latlng) {
                    if (val._latlng.lat == oldDocument.lat && val._latlng.lng == oldDocument.long) {
                        var marker = L.marker(val._latlng);
                        map.removeLayer(oldDocument.lat,oldDocument.long);
                        map.removeLayer(val);

                    }
                }
            }
        }
    });
};

Template.map.helpers({
    logedin: function() {
        if (Meteor.userId())return true;
        return false;
    }
});