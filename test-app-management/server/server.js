var http = require('http')
http.createServer(function(req ,res){
    res.writeHead(200,{			
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type",
        "Content-Type" : "text/html;charset=utf-8"
    });
    res.write('hello world');
    res.end();
}).listen(3000)

console.log("listening at port 3000")