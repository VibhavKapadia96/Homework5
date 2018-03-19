/*eslint-env node*/

var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];
var x = 0;
var topic = null;

console.log("websockets server started");

ws.on("connection", function (socket) {
  console.log("client connection established");

  messages.forEach(function (msg) {
    if(x == 1){
      socket.send(topic);
      x = 0;
    }
    socket.send(msg);
  });

  socket.on("message", function (data) {
    console.log("message received: " + data);

    ws.clients.forEach(function (clientSocket) {

      if(data.startsWith("/topic")){

        topic = "*** Topic Change to " +"\""+data.substring(7)+"\"";
        //messages.push(topic);
        clientSocket.send(topic);
        x = 1;
        topic = "*** Topic is " +"\""+data.substring(7)+"\"";


      }
      else{
        messages.push(data);
        clientSocket.send(data);
      }
    });
  });
});
