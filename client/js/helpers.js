UI.registerHelper('selectedCase', function(context, options) {
     if(Case.findOne(Session.get("selected_case"))){
        console.log(context);
       //if (!Session.get("selected_case")||!Case.findOne(Session.get("selected_case")).context)return "";
       if (context==undefined)return "";
       return context;//Case.findOne(Session.get("selected_case")).context;
       }
    return "titel";
});
