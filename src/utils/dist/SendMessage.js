"use strict";
exports.__esModule = true;
exports.sendMessage = void 0;
var io = require("socket.io-client");
function sendMessage(message, host) {
    var socket = io.io(host);
    socket.emit('new message', message);
}
exports.sendMessage = sendMessage;
