"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var ws_1 = require("ws");
var uuid = require("uuid");
var server = new server_1.Server().app;
var port = 9000;
server.listen(port, function () {
    console.log("Server is running at port " + port);
});
var wss = new ws_1.WebSocketServer({
    port: 8080
});
var clients = new Map();
wss.on('connection', function (ws) {
    var id = uuid.v4();
    clients.set(id, ws);
    ws.send("welcome, your id is " + id);
    ws.on('message', function message(data) {
        var _a = JSON.parse(data), targetID = _a.targetID, content = _a.content;
        var targetClient = clients.get(targetID);
        if (targetClient) {
            targetClient.send(content);
        }
        else {
            console.log("Client with id " + targetID + " not found");
        }
        console.log("received " + data);
    });
    ws.send('something');
});
