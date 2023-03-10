"use strict";
exports.__esModule = true;
exports.Server = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var UserRouter_1 = require("./routes/UserRouter");
var data_source_1 = require("./data-source");
var AdminRouter_1 = require("./routes/AdminRouter");
var FriendsRouter_1 = require("./routes/FriendsRouter");
var MessageRouter_1 = require("./routes/MessageRouter");
var Server = /** @class */ (function () {
    // static wss: any  = new WebSocketServer({port: 8080});;
    function Server() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleError();
        // this.initiateSocket();
    }
    Server.prototype.setConfigurations = function () {
        this.connectToMySQL();
        this.configureBodyParser();
    };
    Server.prototype.connectToMySQL = function () {
        data_source_1.AppDataSource.initialize().then(function () {
            console.log("DB connected successfully");
        })["catch"](function (error) {
            console.log(error);
        });
    };
    Server.prototype.configureBodyParser = function () {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    };
    Server.prototype.setRoutes = function () {
        this.app.use('/api/user/', UserRouter_1["default"]);
        this.app.use('/api/admin/', AdminRouter_1["default"]);
        this.app.use('/api/friends/', FriendsRouter_1["default"]);
        this.app.use('/api/messages/', MessageRouter_1["default"]);
    };
    Server.prototype.error404Handler = function () {
        this.app.use(function (req, res) {
            res.status(404).json({
                message: "Not Found",
                status_code: 404
            });
        });
    };
    Server.prototype.handleError = function () {
        this.app.use(function (error, req, res, next) {
            var errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "Something went wrong. Please try again.",
                status_code: errorStatus
            });
        });
    };
    return Server;
}());
exports.Server = Server;
