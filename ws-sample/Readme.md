# ws-sample

Provides a simple example of how to initialize a server that both serves up
static content along with providing WebSockets handling. This server shows a 
simple communication pattern where messages pushed to the server by one client are
re-broadcast out to all the other connected clients. 

## Build it
You first need to use npm in order to download the require dependencies specified in the
package.json. From within this directory: 
    > npm install
    
## Run it
    > node express-wss-example.js
    
In a browser, open http://localhost/client.html

Open 2 browsersm enter a name in each, and click "Connect"

In one of the browsers, enter values and and click "Update". You should see those values
show up in the other browser as well. There will also be logging messages in the console
where node is running, and in the JavaScript console for each of the connect and update
events.

