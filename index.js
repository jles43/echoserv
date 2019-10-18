'use strict';

const http = require('http');
const url = require('url');
const port = 9201;

const requestHandler = function(req, resp) {
    var resptext = '';
    var respcode = 0;
    var reqUrl = url.parse(req.url);
    console.log('req.url :', req.url);
    console.log('req.method :', req.method);
    console.log('req.headers :', req.headers);
    console.log('reqUrl :', reqUrl);

    if (req.method == 'GET') {
        // split path and remove empty strings
        var p = reqUrl.pathname.split('/').reduce(
            (a,x) => {
                if (x) a.push(x);
                return a;
            }, []
        );
        console.log('p :', p);
        if (p.length==2 && p[0]=='error') {
            var ival = p[1]-0;
            //console.log('ival :', ival);
            if (ival>=200 && ival<600)
                respcode = ival;
            else
                respcode = 400; // Bad Request
        } else {
            resptext = reqUrl.pathname;
        }
    } else if (req.method == 'PUT' || req.method == 'POST') {
        // soll den Datenbuffer zurückgeben
        // aber aktuell wird 405 zurückgegeben
        respcode = 405; // Method Not Allowed
    } else {
        respcode = 405; // Method Not Allowed
    }

    if (!respcode)
        respcode = 200;
    resp.statusCode = respcode;
    /*resp.writeHead(respcode, {
        'Content-Type': 'text/plain'
    });
    resp.write(resptext);*/
    resp.end(resptext, 'utf8');
};

var server = http.createServer(requestHandler);
server.listen(port);

console.log(`server listening on port ${port}`);
