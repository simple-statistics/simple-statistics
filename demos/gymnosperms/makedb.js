var fs = require('fs');

var items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
var options = JSON.parse(fs.readFileSync('options.json', 'utf8'));

var out = [];

out = items.map(function(item) {
    var o = {};
    for (var i = 0; i < item.length; i++) {
        if (options[i]) {
            if (options[i][item[i]]) {
                o[options[i][0]] = options[i][item[i]];
            } else {
                o[options[i][0]] = item[i];
            }
        }
    }
    return o;
});

console.log(JSON.stringify(out));
