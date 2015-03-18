
Template.about.events({
    'click #download':function() {
        console.log("test");
        var json = Case.find().fetch();
    console.log("test2");
    var array = typeof json != 'object' ? JSON.parse(json) : json;

    var str = '';
    var line = '';

        var head = array[0];
        {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';

     
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    var csv = str
    window.open("data:text/csv;charset=utf-8," + escape(csv))
}});
