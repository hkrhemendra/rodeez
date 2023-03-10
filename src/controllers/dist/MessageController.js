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
exports.MessageController = void 0;
var data_source_1 = require("../data-source");
var Friends_1 = require("../entity/Friends");
var Message_1 = require("../entity/Message");
var User_1 = require("../entity/User");
var SendMessage_1 = require("../utils/SendMessage");
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    MessageController.sendMessage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var receiver_id, message, user, userRepository, messageRepository, sender, receiver, socketMessage, messageObj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receiver_id = req.body.receiver_id;
                        message = req.body.message;
                        user = req.user.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        messageRepository = data_source_1.AppDataSource.getRepository(Message_1.Messages);
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: user
                            })];
                    case 2:
                        sender = _a.sent();
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: receiver_id
                            })];
                    case 3:
                        receiver = _a.sent();
                        socketMessage = {
                            sender: user,
                            text: message,
                            recipient: receiver_id
                        };
                        SendMessage_1.sendMessage(socketMessage, req.headers.host);
                        messageObj = new Message_1.Messages();
                        messageObj.message_body = message;
                        messageObj.receiver = receiver;
                        messageObj.user = sender;
                        return [4 /*yield*/, messageRepository.save(messageObj)];
                    case 4:
                        _a.sent();
                        res.json({
                            status: 200,
                            data: messageObj
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.sendGroupMessage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, group_id, message, userRepository, groupRepository, messageRepository, user, group, messageObj, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.user.user_id;
                        group_id = req.body.group_id;
                        message = req.body.message;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        groupRepository = data_source_1.AppDataSource.getRepository(Friends_1.Group);
                        messageRepository = data_source_1.AppDataSource.getRepository(Message_1.Messages);
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: user_id
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, groupRepository.findOneBy({
                                id: group_id
                            })];
                    case 3:
                        group = _a.sent();
                        messageObj = new Message_1.Messages();
                        messageObj.message_body = message;
                        messageObj.user = user;
                        messageObj.group_receiver = group;
                        return [4 /*yield*/, messageRepository.save(messageObj)];
                    case 4:
                        _a.sent();
                        res.json({
                            status: 200,
                            data: messageObj
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.fetchMessages = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user_id, userRepository, messageRepository, sendMessages, receivedMessages, allMessages, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        user_id = req.user.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        messageRepository = data_source_1.AppDataSource.getRepository(Message_1.Messages);
                        return [4 /*yield*/, messageRepository.find({
                                where: {
                                    user: {
                                        id: user_id
                                    },
                                    receiver: {
                                        id: id
                                    }
                                },
                                relations: ["user"]
                            })];
                    case 2:
                        sendMessages = _a.sent();
                        return [4 /*yield*/, messageRepository.find({
                                where: {
                                    user: {
                                        id: id
                                    },
                                    receiver: {
                                        id: user_id
                                    }
                                },
                                relations: ["user"]
                            })];
                    case 3:
                        receivedMessages = _a.sent();
                        allMessages = sendMessages.concat(receivedMessages);
                        allMessages.sort(function (a, b) {
                            return a.created_at.getTime() - b.created_at.getTime();
                        });
                        res.json({
                            status: 200,
                            data: allMessages
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        req.errorStatus = 422;
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MessageController.fetchGroupMessage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var group_id, user_id, userRepository, groupRepository, messageRepository, messages;
            return __generator(this, function (_a) {
                group_id = req.query.group_id;
                user_id = req.user.user_id;
                try {
                    userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                    groupRepository = data_source_1.AppDataSource.getRepository(Friends_1.Group);
                    messageRepository = data_source_1.AppDataSource.getRepository(Message_1.Messages);
                    messages = messageRepository.find({
                        where: {
                            group_receiver: {
                                id: group_id
                            }
                        }
                    });
                    res.json({
                        status: 200,
                        data: messages
                    });
                }
                catch (error) {
                    console.log(error);
                    req.errorStatus = 422;
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return MessageController;
}());
exports.MessageController = MessageController;
