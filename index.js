/*eslint-env node*/

var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var mime = require("mime");
require("./websockets-server");

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      fs.readFile("app/error.html", function (err, data) {
        res.writeHead(404);
        res.end(data);
      });

      console.log;
      return;
    } else {
      var x = mime.getType(filePath);
      console.log(x);
      res.setHeader("Content-Type", x);
      res.end(data);
    }
  });
});

server.listen(3000);
