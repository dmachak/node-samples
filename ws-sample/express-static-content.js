// Provides a simple example of how to initialize a server that both serves up
// static content along with providing WebSockets handling.
// Set up the required packages. ws provides the WebSocket support, express
// provides the server and routing that allow serving up static resources.
var express = require('express');

//init Express
var app = express();

//init Express Router
var router = express.Router();
var port = process.env.PORT || 80;

// Init the express router.  all files under the public folder will be served
// up by the express app router.
// e.g. http://localhost:8080/client.html will serve up public/client.html
app.use("/", router);
app.use(express.static('public'))

// This starts the server listening on the given port.
var server = app.listen(port, function () {
    console.log('node.js static server listening on port: %s', port)
})
