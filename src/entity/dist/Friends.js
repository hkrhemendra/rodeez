"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Group = exports.Friends = exports.Request = void 0;
var typeorm_1 = require("typeorm");
var Message_1 = require("./Message");
var User_1 = require("./User");
var Request = /** @class */ (function () {
    function Request() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("increment")
    ], Request.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.request_sender; })
    ], Request.prototype, "requestSender");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.send_request_id; })
    ], Request.prototype, "sendRequest");
    __decorate([
        typeorm_1.Column({
            nullable: true,
            "default": null
        })
    ], Request.prototype, "response");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], Request.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: "datetime"
        })
    ], Request.prototype, "updated_at");
    Request = __decorate([
        typeorm_1.Entity()
    ], Request);
    return Request;
}());
exports.Request = Request;
var Friends = /** @class */ (function () {
    function Friends() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("increment")
    ], Friends.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.friendsId; })
    ], Friends.prototype, "friends");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], Friends.prototype, "created_at");
    Friends = __decorate([
        typeorm_1.Entity()
    ], Friends);
    return Friends;
}());
exports.Friends = Friends;
var Group = /** @class */ (function () {
    function Group() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Group.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Group.prototype, "name");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], Group.prototype, "created_at");
    __decorate([
        typeorm_1.Column({
            type: "boolean",
            nullable: false,
            "default": true
        })
    ], Group.prototype, "is_active");
    __decorate([
        typeorm_1.ManyToMany(function () { return User_1.User; }, function (users) { return users.group; }),
        typeorm_1.JoinTable()
    ], Group.prototype, "users");
    __decorate([
        typeorm_1.OneToMany(function () { return Message_1.Messages; }, function (messages) { return messages.group_receiver; }, { cascade: true })
    ], Group.prototype, "receiver_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.group_admin_id; })
    ], Group.prototype, "admin_id");
    Group = __decorate([
        typeorm_1.Entity()
    ], Group);
    return Group;
}());
exports.Group = Group;
