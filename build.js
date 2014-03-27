var http = require('http'),
    fs = require('fs'),
    request = require('request'),
    marked = require('marked');

fs.readFile('template.html', 'utf8', function(err, file) {
    request({
        uri: 'https://api.github.com/repos/tmcw/simple-statistics/contents/API.md',
        headers: {
            'User-Agent': 'request'
        },
        json: true
    }, function(err, res) {
        fs.writeFile('index.html', file.replace('{{API}}', marked(
            (new Buffer(res.body.content, 'base64')).toString())));
    });
});
