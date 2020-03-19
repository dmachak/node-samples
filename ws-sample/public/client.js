// This is the code that executes in the client, and sets up a simple communication
// between this client and other clients, acting via the server. 

var socket;

// This is called when the page establishes a connection with the server. For this sample,
// the connection is done explicitly via a user action, but this could also be done when
// the page is being loaded. 
function connect() {
    console.log("connect");
    document.getElementById("latest_name").value = "Connecting";

    socket = new WebSocket('ws://localhost:80');

    // Connection opened
    
    // At the time we create the socket, we set up a listener so we can respond to when
    // the open event is triggered (which should be almost immediately. In this case,
    // we're sending a message with the "connect" message_type and a name that we can
    // be identified by.
    socket.addEventListener('open', function (event) {
        var message = {};
        message.message_type = "connect";
        message.name = document.getElementById("name").value;
        var msg = JSON.stringify(message);
        console.log("sending: %s",  msg);
        socket.send(msg);
    });

    // We also set up a listener to respond to messages sent to this client from the
    // server. The event.data field is a String representation of a JSON object. We 
    // parse it into a JavaScript object. In this case, we know that we should only be
    // receiving objects that have fields name, value1, and value2. (because that is what
    // we're sending in the update() method below, and the server is just re-broadcasting
    // that out to all the clients.) We take these values and update some form elements
    // on the page.
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        let message = JSON.parse(event.data);
        document.getElementById("latest_name").value = message.name;
        document.getElementById("latest_value1").value = message.value1;
        document.getElementById("latest_value2").value = message.value2;
    });
}

// The udpate() function is called when the user clicks the Update button. We collect
// the values from the input form and send those to the server, after converting the JS
// object to a JSON string. The message_type tells the server how to handle the message.
function update() {
    var message = {};
    message.message_type = 'update';
    message.name = document.getElementById("name").value;
    message.value1 = document.getElementById("value1").value;
    message.value2 = document.getElementById("value2").value;
    var msg = JSON.stringify(message);
    console.log("sending: %s",  msg);
    socket.send(msg);
}
