"use strict";
exports.__esModule = true;
exports.MessageRouter = void 0;
var express_1 = require("express");
var MessageController_1 = require("../controllers/MessageController");
var CheckError_1 = require("../middlewares/CheckError");
var MessageValidator_1 = require("../validator/MessageValidator");
var MessageRouter = /** @class */ (function () {
    function MessageRouter() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    MessageRouter.prototype.getRoutes = function () {
        this.router.get('/fetch', CheckError_1.GlobalMiddleware.authenticate, MessageController_1.MessageController.fetchMessages);
        this.router.get('/fetch/group', CheckError_1.GlobalMiddleware.authenticate, MessageController_1.MessageController.fetchGroupMessage);
    };
    MessageRouter.prototype.postRoutes = function () {
        this.router.post('/send/message', MessageValidator_1.MessageValidator.sendMessage(), CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, MessageController_1.MessageController.sendMessage);
        this.router.post('/send/message/group', MessageValidator_1.MessageValidator.sendGroupMessage(), CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, MessageController_1.MessageController.sendGroupMessage);
    };
    MessageRouter.prototype.patchRoutes = function () { };
    MessageRouter.prototype.deleteRoutes = function () { };
    return MessageRouter;
}());
exports.MessageRouter = MessageRouter;
exports["default"] = new MessageRouter().router;
