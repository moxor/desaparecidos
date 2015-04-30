/**
 * Created by nanu on 20.12.14.
 */
//how to get the value
/**
 * get all classes with d_ and visible, check if date is in range if not set visible to invisible.
 * if the range gets bigger  check all invisible and get and change them to visible
 */

Template.slider.rendered = function () {
    //wait 1 second for the map to be renderd
    setTimeout(function (){
    var prim = moment(Session.get("firstDate")).add('d',-1);;
    var last = moment(Session.get("lastDate")).add('d',1);;

    if (prim && last) {
        Session.set("selected_start_date", Session.get("firstDate"));
        Session.set("selected_end_date", Session.get("lastDate"));

            //init slider
            $("#slider").dateRangeSlider({
                bounds: {min: prim, max: last},
                defaultValues: {min: prim, max: last}
            });


        $("#slider").bind("valuesChanged", function(e, data) {

            var visible = $("div[id*='d_'].visible");
            for (var i = 0; i < visible.length; i++) {
                var test = moment(visible[i].id.replace('d_', '').replace('_', ' ').replace('_', ' '));

                if (test.diff(data.values.min, 'days') < 0) {
                    console.log("hey");
                    var str = visible[i].id.replace('d', '#d');

                    //addInvisible(str);
                    document.getElementById(visible[i].id).className =
                        document.getElementById(visible[i].id).className.replace(/\bvisible\b/, 'invisible');

                }
                else if (test.diff(data.values.max, 'days') > 0) {
                    console.log("hey");
                    var str = visible[i].id.replace('d', '#d');

                    addInvisible(str);
                    document.getElementById(visible[i].id).className =
                        document.getElementById(visible[i].id).className.replace(/\bvisible\b/, 'invisible');
                }
            }
            var invisible = $("div[id*='d_'].invisible");
            console.log("invis " + invisible.length + " "+invisible[0]);
            console.log("vis " + visible.length);
            if (invisible) {

                for (var i = 0; i < invisible.length; i++) {
                    var test = moment(invisible[i].id.replace('d_', '').replace('_', ' ').replace('_', ' '));
                    if (test.diff(data.values.min, 'days') > -1 && test.diff(data.values.max, 'days') < 0) {
                        var str = invisible[i].id.replace('d', '#d');
                        //delInvisible(str);
                        document.getElementById(invisible[i].id).className =
                            document.getElementById(invisible[i].id).className.replace(/\binvisible\b/, ' visible');
                    }

                }
            }
        });


    }
    }, 600);
};
var addInvisible=function(str){
    $(str).addClass("invisible");
}
var delInvisible=function(str){
    $(str).removeClass("invisible");
}

Template.slider.helpers({
    datechanged:function(){

        if (Session.get("firstDate")&&Session.get("lastDate"))return true;
        else return false;
    }

});