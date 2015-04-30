// Template.registerHelper('selectedCase', function(context, options) {
//     console.log(context + " dd" + options.toString());
//      if(Case.findOne(Session.get("selected_case"))){
//         console.log(context + " dd" + options.toString());
//       //if (!Session.get("selected_case")||!Case.findOne(Session.get("selected_case")).context)return "";
//       if (context==undefined)return "";
//       return context;//Case.findOne(Session.get("selected_case")).context;
//       }
//     return "titel";
// });
Template.registerHelper('selectedCase', function(params) {
    if(Case.findOne(Session.get("selected_case"))){
        return Case.findOne(Session.get("selected_case"))[params];
        
    }
    else return "";
     
});