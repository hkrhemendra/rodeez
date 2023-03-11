"use strict";
exports.__esModule = true;
exports.ServerSocket = void 0;
var socket_io_1 = require("socket.io");
var ServerSocket = /** @class */ (function () {
    function ServerSocket(server) {
        this.StartListeners = function (socket) {
            console.log('Message received from ' + socket.id);
            socket.on('handshake', function () {
                console.info('Handshake received from ' + socket.id);
            });
            socket.on('disconnect', function () {
                console.info('Disconnect received from ' + socket.id);
            });
        };
        ServerSocket.instance = this;
        this.users = {};
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 1000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });
        this.io.on('connect', this.StartListeners);
        console.info('Socket IO started');
    }
    return ServerSocket;
}());
exports.ServerSocket = ServerSocket;
