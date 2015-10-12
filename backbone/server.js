var http = require('http'),
    fs = require('fs');

var server = http.createServer(function (req, res) {
//    同步
//    fs.readFile(__dirname + '/resources/common.txt', function (err, data) {
//        res.end(data);
//    });

////    异步流
//    var file = resource(req);//__dirname + '/resources/common.txt';


    try {
        var file = __dirname + req.url;
        console.log(req.url, file);
        console.log(file);
        var stream = fs.createReadStream(file);
        stream.pipe(res);
    }catch(e) {
        res.end('Error')
    }


});
server.listen(8000);


