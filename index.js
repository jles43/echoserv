'use strict';

const http = require('http');
const url = require('url');
const port = 9201;

const returnResponse = function(resp, text, code) {
  console.log('returnResponse: text: ',text,', code:', code);
  if (!code)
    code = 200;
  resp.statusCode = code;
  if (text) resp.write(text, 'utf8');
  resp.end();
};

const requestHandler = function(req, resp) {
  var resptext = '';
  var respcode = 0;
  var reqUrl = url.parse(req.url);
  console.log('-------------------------------------------------');
  console.log('req.url :', req.url);
  console.log('req.method :', req.method);
  console.log('req.headers :', req.headers);
  console.log('reqUrl :', reqUrl);

  // split path and remove empty strings
  var p = reqUrl.pathname.split('/').reduce(
    (a,x) => {
        if (x) a.push(x);
        return a;
    }, []
  );
  console.log('p :', p);
  // /error/errno returns error for any method
  if (p.length==2 && p[0]=='error') {
    var ival = p[1]-0;
    //console.log('ival :', ival);
    if (ival>=200 && ival<600)
      respcode = ival;
    else
      respcode = 400; // Bad Request
  }
  if (req.method == 'GET') {
    if (respcode>=300) returnResponse(resp, '', respcode);
    else returnResponse(resp, reqUrl.pathname, respcode);
  } else if (req.method == 'PUT' || req.method == 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data+=chunk;
    });
    req.on('end', function() {
      console.log(req.method+' data: ', data, ', respcode:', respcode);
      if (respcode>=300) returnResponse(resp, '', respcode);
      else returnResponse(resp, data, respcode);
    });
  } else {
    returnResponse(resp, '', 405); // Method Not Allowed
  }
};

var server = http.createServer(requestHandler);
server.listen(port);

console.log(`server listening on port ${port}`);
