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
        return moment(Session.get("firstDate")).format('MM/DD/YYYY');
    },
    ultimoDato:function () {
        return moment(Session.get("lastDate")).format('MM/DD/YYYY');
    }

});