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
exports.UserValidators = void 0;
var express_validator_1 = require("express-validator");
var data_source_1 = require("../data-source");
var User_1 = require("../entity/User");
var UserValidators = /** @class */ (function () {
    function UserValidators() {
    }
    UserValidators.singUp = function () {
        var _this = this;
        var usersRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        return [
            express_validator_1.body('firstName', 'First Name required').isString(),
            express_validator_1.body('lastName', 'First Name required').isString(),
            express_validator_1.body('email', 'Email is required').isEmail().custom(function (email, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersRepository.findOneBy({
                                    email: email
                                }).then(function (user) {
                                    console.log(user);
                                    if (user) {
                                        req.errorStatus = 422;
                                        throw new Error('Email already exist');
                                    }
                                    else {
                                        return true;
                                    }
                                })];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }),
            express_validator_1.body('phone', "Phone number required")
                .isLength({ min: 10, max: 12 })
                .isNumeric()
                .withMessage('Please enter you phone')
                .custom(function (phone, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersRepository.findOneBy({
                                    phone: phone
                                }).then(function (user) {
                                    if (user) {
                                        req.errorStatus = 422;
                                        throw new Error('Phone no already exist');
                                    }
                                    else {
                                        return true;
                                    }
                                })];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }),
            express_validator_1.body('password', 'Password required')
                .isAlphanumeric()
                .isLength({ min: 6 })
                .withMessage('Min 6 characters required')
        ];
    };
    UserValidators.login = function () {
        var _this = this;
        var usersRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        return [
            express_validator_1.query('login_id', 'Email or Phone number is required')
                .custom(function (login_id, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, usersRepository.find({
                                    where: [{ email: login_id }, { phone: login_id }]
                                }).then(function (user) {
                                    if (user) {
                                        req.user = user[0];
                                        return true;
                                    }
                                    else {
                                        req.errorStatus = 422;
                                        throw new Error('User Does Not Exist');
                                    }
                                })];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }),
            express_validator_1.query('password', 'Password is required').isAlphanumeric()
        ];
    };
    UserValidators.verifyUser = function () {
        return [
            express_validator_1.body('verification_token', 'Verification Token is Require').isNumeric()
        ];
    };
    UserValidators.verifyResetPasswordToken = function () {
        var _this = this;
        var userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        var tokenRepository = data_source_1.AppDataSource.getRepository(User_1.Token);
        return [
            express_validator_1.query('reset_password_token', 'Reset Password Token is required')
                .isNumeric().custom(function (token, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    var mainUser;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, userRepository.findOneBy({
                                    email: req.body.email
                                })];
                            case 1:
                                mainUser = _b.sent();
                                return [4 /*yield*/, tokenRepository.find({
                                        where: { user: { id: mainUser.id } }
                                    }).then(function (mainToken) {
                                        if (mainToken[0].reset_password_token == token && Date.now() < mainToken[0].reset_password_token_time.getTime()) {
                                            return true;
                                        }
                                        else {
                                            return new Error('Token Does not exist. Please Request for a new One');
                                        }
                                    })];
                            case 2: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            })
        ];
    };
    UserValidators.sendResetPasswordEmail = function () {
        var userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        return [
            express_validator_1.query('email').isEmail().custom(function (email, _a) {
                var req = _a.req;
                return userRepository.findOneBy({ email: email }).then(function (user) {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error('Email does not exist');
                    }
                });
            })
        ];
    };
    UserValidators.resetPassword = function () {
        var _this = this;
        var userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        return [
            express_validator_1.body('email', 'Email is Required')
                .isEmail()
                .custom(function (email, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, userRepository.findOneBy({ email: email }).then(function (user) {
                                    if (user) {
                                        req.user = user;
                                        return true;
                                    }
                                    else {
                                        throw new Error('User Does Not Exist');
                                    }
                                })];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }),
            express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric()
                .custom(function (newPassword, _a) {
                var req = _a.req;
                if (newPassword === req.body.confirm_password) {
                    return true;
                }
                else {
                    throw new Error('Confirm password and new password does not match');
                }
            }),
            express_validator_1.body('confirm_password', 'Confirm Password is Required'),
            express_validator_1.body('reset_password_token', 'Reset password Token missing').isNumeric()
                .custom(function (token, _a) {
                var req = _a.req;
                if (req.user.reset_password_token == Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid. Please Try Again');
                }
            })
        ];
    };
    UserValidators.updatePassword = function () {
        var userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        return [
            express_validator_1.body('password', 'Password is Required')
                .isAlphanumeric(),
            express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric(),
            express_validator_1.body('confirm_password', 'Confirm Password is Required').isAlphanumeric()
                .custom(function (confirmPassword, _a) {
                var req = _a.req;
                if (confirmPassword === req.body.new_password) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Password and confirm Password does not match');
                }
            })
        ];
    };
    return UserValidators;
}());
exports.UserValidators = UserValidators;
