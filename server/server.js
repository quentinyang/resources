var http = require('http'),
    fs = require('fs');

var server = http.createServer(function (req, res) {

    var realUrl = req.url;
    if (/\?/.test(req.url)) {
        var realUrl = req.url.split('?')[0];

    }
    var file = __dirname + realUrl;

    function error(req, res) {
        console.log('ERROR: \n', req.url, '\nFILE:\n', file);
        res.end('Error')
    }

    try {

        console.log('REQUEST: \n', req.url, '\nFILE:\n', file);
        if (fs.existsSync(file)) {
            var stream = fs.createReadStream(file);
            stream.pipe(res);
        } else {
            error(req, res);
        }

    }catch(e) {
        error(req, res);
    }

});
server.listen(8000);


