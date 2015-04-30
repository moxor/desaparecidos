
Meteor.startup(function () {
  if (Case.find().count() === 0|| Case.find().count()<100){
        var myjson = {};
        var i=0;
        myjson = JSON.parse(Assets.getText("test.json"));
        for(i = 0; i<myjson.titel[0].length;i++){
            try {
            console.log(myjson.location[0][i]);
            var geo = new GeoCoder({geocoderProvider: "openstreetmap"});
            var result = geo.geocode(myjson.location[0][i]);
                Case.insert({
                    author:"WanSbdaFpvEfyJKKS",
                    approved:true,
                    entrydate:new Date(),
                            titel:myjson.titel[0][i],
                            desaparicidos:1, 
                            muertos:0, 
                            picture:myjson.picture[0][i],
                            description:myjson.description[0][i],
                            dateCase:myjson.dateCase[0][i],
                            location:myjson.location[0][i],
                            lat:result[0].latitude,
                            long:result[0].longitude,
                            entrydate:new Date()})
                
            } catch(err) {
console.log( err.message);
}
              }
  }
});
