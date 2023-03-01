"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Friends_1 = require("./entity/Friends");
var Message_1 = require("./entity/Message");
var User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "riders",
    synchronize: true,
    logging: false,
    entities: [User_1.User, User_1.Token, Message_1.Messages, Friends_1.Request, Friends_1.Friends, Friends_1.Group],
    migrations: [],
    subscribers: []
});
