"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.FriendsController = void 0;
var data_source_1 = require("../data-source");
var Friends_1 = require("../entity/Friends");
var User_1 = require("../entity/User");
var FriendsController = /** @class */ (function () {
    function FriendsController() {
    }
    FriendsController.invite = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, request_id, userRepository, requestUser, mainUser, requestRepository, newRequestUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        request_id = req.body.receiverId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: request_id
                            })];
                    case 2:
                        requestUser = _a.sent();
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: user.user_id
                            })];
                    case 3:
                        mainUser = _a.sent();
                        if (!requestUser) return [3 /*break*/, 5];
                        console.log("requestUser --------------> ", requestUser);
                        requestRepository = data_source_1.AppDataSource.getRepository(Friends_1.Request);
                        newRequestUser = new Friends_1.Request();
                        newRequestUser.requestSender = mainUser;
                        newRequestUser.sendRequest = requestUser;
                        newRequestUser.response = null;
                        return [4 /*yield*/, requestRepository.save(newRequestUser)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                status: 200,
                                data: newRequestUser
                            })];
                    case 5:
                        req.errorStatus = 422;
                        return [2 /*return*/, new Error("Request user id not found")];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.log(error_1);
                        next(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FriendsController.acceptInvite = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestSenderId, sendRequestId, userRepository, requestRepository, friendRepository, request, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestSenderId = req.body.senderId;
                        sendRequestId = req.user.user_id;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        requestRepository = data_source_1.AppDataSource.getRepository(Friends_1.Request);
                        friendRepository = data_source_1.AppDataSource.getRepository(Friends_1.Friends);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, requestRepository.find({
                                where: {
                                    requestSender: {
                                        id: requestSenderId
                                    },
                                    sendRequest: {
                                        id: sendRequestId
                                    }
                                }
                            })];
                    case 2:
                        request = _a.sent();
                        if (!request) return [3 /*break*/, 4];
                        request.forEach(function (value) {
                            value.response = "accepted";
                        });
                        return [4 /*yield*/, requestRepository.save(request)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                status: 200,
                                data: request
                            })];
                    case 4:
                        req.errorStatus = 422;
                        return [2 /*return*/, new Error('Something went wrong please try again later')];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        next(error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FriendsController.listFriends = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userRepository, requestRepository, currentUser, friends, filteredFriends, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        requestRepository = data_source_1.AppDataSource.getRepository(Friends_1.Request);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: user.user_id
                            })];
                    case 2:
                        currentUser = _a.sent();
                        return [4 /*yield*/, requestRepository.find({
                                where: [{
                                        sendRequest: {
                                            id: user.user_id
                                        }
                                    },
                                    {
                                        requestSender: {
                                            id: user.user_id
                                        }
                                    }
                                ],
                                relations: {
                                    requestSender: true,
                                    sendRequest: true
                                }
                            })];
                    case 3:
                        friends = _a.sent();
                        filteredFriends = friends.map(function (element) {
                            if (element.response === "accepted") {
                                return element;
                            }
                        });
                        res.json({
                            status: "200",
                            data: filteredFriends
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FriendsController.createGroup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, members, name, userRepository_1, groupRepository, mainUser, groupUserArray, group, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        members = req.body.members;
                        name = req.body.name;
                        members = JSON.parse(members);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        console.log(members);
                        userRepository_1 = data_source_1.AppDataSource.getRepository(User_1.User);
                        groupRepository = data_source_1.AppDataSource.getRepository(Friends_1.Group);
                        return [4 /*yield*/, userRepository_1.findOneBy({
                                id: user.user_id
                            })];
                    case 2:
                        mainUser = _a.sent();
                        return [4 /*yield*/, Promise.all(members.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, userRepository_1.findOneBy({
                                                id: element
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 3:
                        groupUserArray = _a.sent();
                        groupUserArray.push(mainUser);
                        console.log(groupUserArray);
                        group = new Friends_1.Group();
                        group.admin_id = mainUser;
                        group.is_active = true;
                        group.users = groupUserArray;
                        group.name = name;
                        return [4 /*yield*/, groupRepository.save(group)];
                    case 4:
                        _a.sent();
                        res.json({
                            status: 200,
                            data: group
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        console.log(error_4);
                        req.errorStatus = 422;
                        next(error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FriendsController.listGroups = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, userRepository, groupRepository, users, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user_id = req.user.user_id;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        groupRepository = data_source_1.AppDataSource.getRepository(Friends_1.Group);
                        return [4 /*yield*/, userRepository.find({
                                where: {
                                    id: user_id
                                },
                                relations: ["group"]
                            })];
                    case 1:
                        users = _a.sent();
                        res.json({
                            status: 200,
                            data: users
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        req.errorStatus = 422;
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FriendsController;
}());
exports.FriendsController = FriendsController;
