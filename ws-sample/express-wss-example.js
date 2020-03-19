// Provides a simple example of how to initialize a server that both serves up
// static content along with providing WebSockets handling. This server shows a 
// simple communication pattern where messages pushed to the server by one client are
// re-broadcast out to all the other connected clients. 

// Set up the required packages. ws provides the WebSocket support, express
// provides the server and routing that allows serving up static resources.
const SocketServer = require('ws').Server;
var express = require('express');

//init Express
var app = express();

//init Express Router
var router = express.Router();
var port = process.env.PORT || 80;

// clients stores client websocket connections
const clients = new Map();

// Init the express router.  all files under the public folder will be served
// up by the express app router.
// e.g. http://localhost/client.html will serve up public/client.html
app.use("/", router);
app.use(express.static('public'))

// This starts the server listening on the given port.
var server = app.listen(port, function () {
    console.log('node.js static server listening on port: ' + port + ", with websockets listener")
})

// Now that we have a server, we can pass this to the WebSocketServer, which
// will handle requests coming in using the ws:// protocol.
const wss = new SocketServer({ server });

//init Websocket ws and handle incoming connect requests.
// this function is called when a new connection is 
//established with the server. 
wss.on('connection', function connection(client) {
    console.log("connection ...");

    // set the callback for when a message comes in.
    client.on('message', function incoming(msg) {
        // The message coming in is a JSON string that we need to parse into a JS object.
        // Each message has message_type and name fields. The message_type tells us how
        // to handle the message, and the name field tells us who it's coming from.
        var message = JSON.parse(msg);
        console.log("received message: " + msg);
        
        if (message.message_type == 'connect') {
            // For connect messages, just map the client connection object to the name.
            console.log("Connection from %s", message.name);
            clients.set(message.name, client);
        } else if (message.message_type == 'update') {
            // For update messages, we're getting some data from a client. We push that
            // data back out to all the other clients that have established a connection.
            console.log("Update from %s", message.name);
            clients.forEach(function(client, index) {
                client.send(msg);
            })
        }
    });
});
