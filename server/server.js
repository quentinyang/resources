var http = require('http'),
    fs = require('fs');

var server = http.createServer(function (req, res) {

    var file = __dirname + req.url;
    try {
        console.log('REQUEST: \n', req.url, '\nFILE:\n', file);
        var stream = fs.createReadStream(file);
        stream.pipe(res);
    }catch(e) {
        console.log('ERROR: \n', req.url, '\nFILE:\n', file);
        res.end('Error')
    }

});
server.listen(8000);


