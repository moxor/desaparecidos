/**
 * Created by nanu on 20.12.14.
 */
//how to get the value
/**
 * get all classes with d_ and visible, check if date is in range if not set visible to invisible.
 * if the range gets bigger  check all invisible and get and change them to visible
 */

Template.slider.rendered = function () {
    setTimeout(function (){
    var prim = moment(Session.get("primeroDato"));
    var last = moment(Session.get("ultimoDato"));
    console.log(prim);

    console.log(last);
    if (prim && last) {
        Session.set("selected_start_date", Session.get("primeroDato"));
        Session.set("selected_end_date", Session.get("ultimoDato"));

            $("#slider").dateRangeSlider({
                bounds: {min: prim, max: last},
                defaultValues: {min: prim, max: last}
            });

        $("#slider").bind("valuesChanged", function(e, data){

            var visible=$("div[id*='d_'].visible" );
            for(var i=0; i<visible.length;i++){
                var test=moment(visible[i].id.replace('d_','').replace('_',' ').replace('_',' '));

                if (test.diff(data.values.min,'days')<0) {
                    console.log("hey");
                    var str=visible[i].id.replace('d','#d');

                    addInvisible(str);
                    document.getElementById(str).className =
                        document.getElementById(str).className.replace(/\bvisible\b/,'invisible');

                }
                else if (test.diff(data.values.max,'days')>0) {
                    $("div#"+visible[i].id).removeClass("visible").addClass("invisible");
                }
            }
            var invisible=$("div[id*='d_'].invisible" );
            for(var i=0; i<invisible.length;i++){
                var test=moment(invisible[i].id.replace('d_','').replace('_',' ').replace('_',' '));
                if (test.diff(data.values.min,'days')>0) {
                    var str=invisible[i].id.replace('d','#d');
                    delInvisible(str);
                    document.getElementById(str).className =
                        document.getElementById(str).className.replace(/\binvisible\b/,' visible');
                }
                else if (test.diff(data.values.max,'days')<0) {
                    $("#"+invisible[i].id).removeClass("invisible").addClass("visible");
                }
            }

        });


    }
    }, 1000);
    $("div[id*='d_'].visible" ).length
};
var addInvisible=function(str){
    $(str).addClass("invisible");
}
var delInvisible=function(str){
    $(str).removeClass("invisible");
}
Template.slider.helpers({
    datechanged:function(){

        if (Session.get("primeroDato")&&Session.get("ultimoDato"))return true;
        else return false;
    }

});