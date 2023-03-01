"use strict";
exports.__esModule = true;
exports.FriendsRouter = void 0;
var express_1 = require("express");
var FriendsController_1 = require("../controllers/FriendsController");
var CheckError_1 = require("../middlewares/CheckError");
var FriendsValidator_1 = require("../validator/FriendsValidator");
var FriendsRouter = /** @class */ (function () {
    function FriendsRouter() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    FriendsRouter.prototype.getRoutes = function () {
        this.router.get('/list/friends', CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, FriendsController_1.FriendsController.listFriends);
        this.router.get('/list/group', CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, FriendsController_1.FriendsController.listGroups);
    };
    FriendsRouter.prototype.postRoutes = function () {
        this.router.post('/invite', FriendsValidator_1.FriendsValidator.invite(), CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, FriendsController_1.FriendsController.invite);
        this.router.post('/create/group', FriendsValidator_1.FriendsValidator.createGroup(), CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, FriendsController_1.FriendsController.createGroup);
    };
    FriendsRouter.prototype.patchRoutes = function () {
        this.router.patch('/accept/invite', FriendsValidator_1.FriendsValidator.acceptInvite(), CheckError_1.GlobalMiddleware.checkError, CheckError_1.GlobalMiddleware.authenticate, FriendsController_1.FriendsController.acceptInvite);
    };
    FriendsRouter.prototype.deleteRoutes = function () { };
    return FriendsRouter;
}());
exports.FriendsRouter = FriendsRouter;
exports["default"] = new FriendsRouter().router;
