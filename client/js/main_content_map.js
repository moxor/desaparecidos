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
Template.map.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("cases");
});
Template.map.rendered = function() {
    //resize for the map
    $(window).resize(function () {
        var h = $(window).height(), offsetTop = 90; // Calculate the top offset
        $('#map_canvas').css('height', (h - offsetTop));
    }).resize();
    //icons-path
    L.Icon.Default.imagePath = '/images'
    var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
	}),
	latlng = L.latLng(23.3927, -100.6192);
    
    //disable zoom on doubleclick for adding a marker
    var map = L.map('map', { center: latlng, zoom: 5, layers: [tiles],doubleClickZoom: false });

    //define map provider
    //L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
    var progress = document.getElementById('progress');
		var progressBar = document.getElementById('progress-bar');
		function updateProgressBar(processed, total, elapsed, layersArray) {
			if (elapsed > 1000) {
				// if it takes more than a second to load, display the progress bar:
				progress.style.display = 'block';
				progressBar.style.width = Math.round(processed/total*100) + '%';
			}
			if (processed === total) {
				// all markers processed - hide the progress bar:
				progress.style.display = 'none';
			}
		}
		var markers = L.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });
		var markerList = [];
		var data=Case.find().fetch();
		console.log(data.length);
		for (var i = 0; i < data.length; i++) {
		    //numbers
            var numbers=(document.desaparecidos ? data[i].desaparecidos :0);// + (data[i].deaths? data[i].deaths :0) ;
            if (numbers==0)numbers=1;
            Session.set("desaparecidos",Session.get("desaparecidos")+numbers);
            if (data[i].dateCase != undefined){
                if (moment(Session.get("lastDate")).diff(moment(data[i].dateCase),'days')<0||Session.get("lastDate")==undefined) Session.set("lastDate", data[i].dateCase);
                if (moment(Session.get("firstDate")).diff(moment(data[i].dateCase),'days')>0||Session.get("firstDate")==undefined) Session.set("firstDate", data[i].dateCase);
            }
            var latlng={lat:data[i].lat,lng:data[i].long};
            if (data[i].lat==undefined)latlng={lat:0,lng:0};
            var marker = new L.Marker(latlng,{
                  _id:data[i]._id,
                 icon: createIcon(numbers?numbers:"1",data[i]._id)
            });
            marker.on('click', function(event) {
                var constClass="."+event.target.options._id;
                console.log(event.target.options._id);
                $('.selecteded').toggleClass("selecteded");
                $(constClass).addClass("selecteded");
                Session.set("selected_case",event.target.options._id);
            });
    		markerList.push(marker);
		}
    console.log('start clustering: ' + window.performance.now());
    
	markers.addLayers(markerList);
	map.addLayer(markers);
	console.log('end clustering: ' + window.performance.now());
	
    //add marker to map
    map.on('dblclick', function(event) {
        $(".hasDatepicker").removeClass("hasDatepicker"); 
        $("ui-datepicker-div").remove();
        if(Meteor.user && Meteor.user().emails && !Meteor.user().emails[0].verified )
            Session.set("showError",{Message:"Email not verified, please write Mail to info @ desaparecidosmx.org"});
        else if (Meteor.userId()&&Meteor.user().emails[0].verified ){
            Session.set("createCoords", {latlng: event.latlng ,userid:Meteor.userId()});
            Meteor.call("get_country", event.latlng, function(error, country) {
                Session.set("country",country);
                if (country=="MX")Session.set("showCreateDialog", true);
                else Session.set("showErrorCountry",true);

            });

            Meteor.call("get_city", event.latlng, function(error, city) {
                Session.set("city",city);
            });


        };

    });

    //load markers from the colleection
    var query = Case.find();
     query.observeChanges({

    //      added: function(document) {
    //          var numbers=(document.desaparecidos ? data[i].desaparecidos :0);// + (data[i].deaths? data[i].deaths :0) ;
    //         if (numbers==0)numbers=1;
    //         var latlng={lat:data[i].lat,lng:data[i].long};
    //         if (data[i].lat==undefined)latlng={lat:0,lng:0};
    //         var marker = new L.Marker(latlng,{
    //               _id:data[i]._id,
    //              icon: createIcon(numbers?numbers:"1",data[i]._id)
    //         });
    //         marker.on('click', function(event) {
    //             var constClass="."+event.target.options._id;
    //             console.log(event.target.options._id);
    //             $('.selecteded').toggleClass("selecteded");
    //             $(constClass).addClass("selecteded");
    //             Session.set("selected_case",event.target.options._id);
    //         });
    // 		markerList.push(marker)
    // 		map.removeLayer(markers);
    // 		markers.addLayers(markerList);
    //     	map.addLayer(markers);
    //     },
        removed: function(oldDocument) {
            //get the numbers right
            if (oldDocument.desaparecidos){
                Session.set("desaparecidos",Session.get("desaparecidos")-parseInt(oldDocument.desaparecidos));
            }
            // if (oldDocument.deaths){
            //     Session.set("deaths",Session.get("deaths")-parseInt(oldDocument.deaths));
            // }
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
    },
    ready:function(){
        return false;
    }
});
Template.map_container.helpers({
    ready:function(){
        return Session.get("data_loaded");
    }
});