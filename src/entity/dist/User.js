"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Token = exports.User = void 0;
var typeorm_1 = require("typeorm");
var Message_1 = require("./Message");
var Friends_1 = require("./Friends");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("increment")
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "first_name");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "last_name");
    __decorate([
        typeorm_1.Column({
            nullable: true
        })
    ], User.prototype, "avatar");
    __decorate([
        typeorm_1.Column("varchar", { length: 500, nullable: true })
    ], User.prototype, "about");
    __decorate([
        typeorm_1.Column({
            unique: true
        })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            unique: true
        })
    ], User.prototype, "phone");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({
            "default": false
        })
    ], User.prototype, "is_admin");
    __decorate([
        typeorm_1.Column({
            "default": false
        })
    ], User.prototype, "verified");
    __decorate([
        typeorm_1.Column({
            "default": false
        })
    ], User.prototype, "is_google");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], User.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: "datetime"
        })
    ], User.prototype, "updated_at");
    __decorate([
        typeorm_1.OneToOne(function () { return Token; }, function (token) { return token.user; })
    ], User.prototype, "metadata");
    __decorate([
        typeorm_1.OneToMany(function () { return Message_1.Messages; }, function (messages) { return messages.user; }, { cascade: true })
    ], User.prototype, "messages");
    __decorate([
        typeorm_1.OneToMany(function () { return Message_1.Messages; }, function (messages) { return messages.user; }, { cascade: true })
    ], User.prototype, "receiver");
    __decorate([
        typeorm_1.OneToMany(function () { return Friends_1.Group; }, function (group) { return group.admin_id; }, { cascade: true })
    ], User.prototype, "group_admin_id");
    __decorate([
        typeorm_1.ManyToMany(function () { return Friends_1.Group; }, function (group) { return group.users; })
    ], User.prototype, "group");
    __decorate([
        typeorm_1.OneToMany(function () { return Friends_1.Request; }, function (request) { return request.requestSender; }, { cascade: true })
    ], User.prototype, "request_sender");
    __decorate([
        typeorm_1.OneToMany(function () { return Friends_1.Request; }, function (request) { return request.sendRequest; }, { cascade: true })
    ], User.prototype, "send_request_id");
    __decorate([
        typeorm_1.OneToMany(function () { return Friends_1.Friends; }, function (friends) { return friends.friends; }, { cascade: true })
    ], User.prototype, "friendsId");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
var Token = /** @class */ (function () {
    function Token() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Token.prototype, "id");
    __decorate([
        typeorm_1.OneToOne(function () { return User; }, function (user) { return user.metadata; }),
        typeorm_1.JoinColumn()
    ], Token.prototype, "user");
    __decorate([
        typeorm_1.Column({
            nullable: true
        })
    ], Token.prototype, "verification_token");
    __decorate([
        typeorm_1.Column({
            type: "datetime",
            nullable: true
        })
    ], Token.prototype, "verification_token_time");
    __decorate([
        typeorm_1.Column({
            nullable: true
        })
    ], Token.prototype, "reset_password_token");
    __decorate([
        typeorm_1.Column({
            type: "datetime",
            nullable: true
        })
    ], Token.prototype, "reset_password_token_time");
    __decorate([
        typeorm_1.CreateDateColumn({
            type: "datetime"
        })
    ], Token.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn({
            type: "datetime"
        })
    ], Token.prototype, "updated_at");
    Token = __decorate([
        typeorm_1.Entity()
    ], Token);
    return Token;
}());
exports.Token = Token;
