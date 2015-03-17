/**
 * Created by nanu on 20.12.14.
 */
Template.numbers.helpers({
    getDesaparecidos:function () {
        return Session.get("desaparecidos");
    },
    getDeaths:function () {
        return Session.get("deaths");
    },
    primeroDato:function () {
        return moment(Session.get("primeroDato")).format('MM/DD/YYYY');
    },
    ultimoDato:function () {
        return moment(Session.get("ultimoDato")).format('MM/DD/YYYY');
    }

});