"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Messages = void 0;
var typeorm_1 = require("typeorm");
var Friends_1 = require("./Friends");
var User_1 = require("./User");
var Messages = /** @class */ (function () {
    function Messages() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Messages.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.messages; })
    ], Messages.prototype, "user");
    __decorate([
        typeorm_1.Column({
            type: "text"
        })
    ], Messages.prototype, "message_body");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.receiver; })
    ], Messages.prototype, "receiver");
    __decorate([
        typeorm_1.ManyToOne(function () { return Friends_1.Group; }, function (group) { return group.receiver_id; })
    ], Messages.prototype, "group_receiver");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], Messages.prototype, "created_at");
    Messages = __decorate([
        typeorm_1.Entity()
    ], Messages);
    return Messages;
}());
exports.Messages = Messages;
