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
exports.UserController = void 0;
var data_source_1 = require("../data-source");
var User_1 = require("../entity/User");
var Utils_1 = require("../utils/Utils");
var jwt = require("jsonwebtoken");
var env_1 = require("../environments/env");
var NodeMailer_1 = require("../utils/NodeMailer");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.signUp = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, email, phone, password, hash, user, token, _a, userRepository, tokenRepository, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        firstName = req.body.firstName;
                        lastName = req.body.lastName;
                        email = req.body.email;
                        phone = req.body.phone;
                        password = req.body.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Utils_1.Utils.encryptPassword(password)];
                    case 2:
                        hash = _b.sent();
                        user = new User_1.User();
                        user.first_name = firstName;
                        user.last_name = lastName;
                        user.email = email;
                        user.phone = phone;
                        user.password = hash.toString();
                        if (req.body.is_google) {
                            user.is_google = req.body.is_google;
                        }
                        token = new User_1.Token();
                        token.user = user;
                        _a = token;
                        return [4 /*yield*/, Utils_1.Utils.generateVerificationToken()];
                    case 3:
                        _a.verification_token = _b.sent();
                        token.verification_token_time = new Date(Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        tokenRepository = data_source_1.AppDataSource.getRepository(User_1.Token);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, tokenRepository.save(token)];
                    case 5:
                        _b.sent();
                        res.json({
                            token: token
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        next(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var login_id, password, user, token, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login_id = req.query.login_id;
                        password = req.query.password;
                        user = req.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Utils_1.Utils.comparePassword({
                                plainPassword: password,
                                encryptPassword: user.password
                            })];
                    case 2:
                        _a.sent();
                        token = jwt.sign({
                            email: user.email,
                            phone: user.phone,
                            user_id: user.id
                        }, env_1.getEnvironmentVariables().jwt_secret, {
                            expiresIn: '120d'
                        });
                        data = {
                            status: 200,
                            token: token
                        };
                        res.json(data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.resendVerificationEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, verificationToken, userRepository, tokenRepository, user, token, mailer, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.query.email;
                        verificationToken = Utils_1.Utils.generateVerificationToken();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        tokenRepository = data_source_1.AppDataSource.getRepository(User_1.Token);
                        return [4 /*yield*/, userRepository.findOneBy({
                                email: email
                            })];
                    case 2:
                        user = _a.sent();
                        console.log("User------------> ", user);
                        if (!user) {
                            return [2 /*return*/, res.json({
                                    status: 422,
                                    message: "User doesn't exist. Please register your email first."
                                })];
                        }
                        return [4 /*yield*/, tokenRepository.find({
                                where: {
                                    user: {
                                        id: user.id
                                    }
                                }
                            })];
                    case 3:
                        token = _a.sent();
                        // console.log("Token------------> ",token)
                        token[0].verification_token = verificationToken;
                        token[0].verification_token_time = new Date(Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME);
                        console.log("Token------------> ", token);
                        return [4 /*yield*/, tokenRepository.save(token)];
                    case 4:
                        _a.sent();
                        if (!token) return [3 /*break*/, 6];
                        return [4 /*yield*/, NodeMailer_1.NodeMailer.sendEmail({
                                to: [user.email],
                                subject: 'Email Verification',
                                html: "<h1>" + verificationToken + "</h1>"
                            })];
                    case 5:
                        mailer = _a.sent();
                        _a.label = 6;
                    case 6:
                        res.json({
                            success: true
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.verify = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var verificationToken, email, userRepository, user, tokenRepository, token, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verificationToken = req.body.verification_token;
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOneBy({
                                email: email
                            })];
                    case 2:
                        user = _a.sent();
                        tokenRepository = data_source_1.AppDataSource.getRepository(User_1.Token);
                        return [4 /*yield*/, tokenRepository.find({
                                where: {
                                    user: {
                                        id: user.id
                                    }
                                }
                            })];
                    case 3:
                        token = _a.sent();
                        if (!(token[0].verification_token === Number(verificationToken) && token[0].verification_token_time.getTime() > Date.now())) return [3 /*break*/, 5];
                        user.verified = true;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 4:
                        _a.sent();
                        res.json({
                            status: 200,
                            message: "Verified Successfully",
                            userInfo: user
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        req.errorStatus = 422;
                        throw new Error('Verification token is expired. Please Request for new one');
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        next(e_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.verifyResetPasswordToken = function (req, res, next) {
        res.json({
            status: 200,
            success: true
        });
    };
    UserController.sendResetPasswordEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, resetPasswordToken, userRepository, tokenRepository, userInfo, token, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.query.email;
                        console.log(email);
                        resetPasswordToken = Utils_1.Utils.generateVerificationToken();
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        tokenRepository = data_source_1.AppDataSource.getRepository(User_1.Token);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, userRepository.findOneBy({
                                email: email
                            })];
                    case 2:
                        userInfo = _a.sent();
                        return [4 /*yield*/, tokenRepository.find({
                                where: {
                                    user: {
                                        id: userInfo.id
                                    }
                                }
                            })];
                    case 3:
                        token = _a.sent();
                        token[0].reset_password_token = resetPasswordToken,
                            token[0].reset_password_token_time = new Date(Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME);
                        return [4 /*yield*/, tokenRepository.save(token)];
                    case 4:
                        _a.sent();
                        console.log(token);
                        res.json({
                            status: 200,
                            user: userInfo,
                            token: token
                        });
                        return [4 /*yield*/, NodeMailer_1.NodeMailer.sendEmail({
                                to: [email],
                                subject: 'Reset Password Email',
                                html: "" + resetPasswordToken
                            })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.resetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, newPassword, userRepository, encryptedPassword, updatedUser, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        newPassword = req.body.new_password;
                        userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Utils_1.Utils.encryptPassword(newPassword)];
                    case 2:
                        encryptedPassword = _a.sent();
                        return [4 /*yield*/, userRepository.findOneBy({
                                id: user.user_id
                            })];
                    case 3:
                        updatedUser = _a.sent();
                        updatedUser.password = encryptedPassword.toString();
                        return [4 /*yield*/, userRepository.save(updatedUser)];
                    case 4:
                        _a.sent();
                        res.json({
                            status: 200,
                            message: "Password reset successfully",
                            user: updatedUser
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _a.sent();
                        req.errorStatus(422);
                        next(e_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.updatePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, password, confirmPassword, newPassword, userRepository_1, e_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.user.user_id;
                        console.log(req.user);
                        password = req.body.password;
                        confirmPassword = req.body.confirm_password;
                        newPassword = req.body.new_password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userRepository_1 = data_source_1.AppDataSource.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository_1.findOneBy({
                                id: user_id
                            }).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var isCorrectPassword, encryptedPassword, newUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Utils_1.Utils.comparePassword({
                                                plainPassword: password,
                                                encryptPassword: user.password
                                            })];
                                        case 1:
                                            isCorrectPassword = _a.sent();
                                            if (!(isCorrectPassword === true)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, Utils_1.Utils.encryptPassword(newPassword)];
                                        case 2:
                                            encryptedPassword = _a.sent();
                                            return [4 /*yield*/, userRepository_1.findOneBy({
                                                    id: user_id
                                                })];
                                        case 3:
                                            newUser = _a.sent();
                                            newUser.password = encryptedPassword.toString();
                                            return [4 /*yield*/, userRepository_1.save(newUser)];
                                        case 4:
                                            _a.sent();
                                            res.json({
                                                status: 200,
                                                message: "Password updated successfully",
                                                user: newUser
                                            });
                                            return [3 /*break*/, 6];
                                        case 5:
                                            res.json({
                                                status: 422,
                                                message: "Please Enter Correct Password"
                                            });
                                            _a.label = 6;
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
