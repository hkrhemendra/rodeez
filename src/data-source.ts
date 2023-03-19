
import { DataSource } from "typeorm"
import { Friends, Group, Request } from "./entity/Friends"
import { Messages } from "./entity/Message"
import { Plan } from "./entity/Plans"
import { User, Token, Subscribers } from "./entity/User"

// export const AppDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "",
//     database: "riders",
//     synchronize: true,
//     logging: false,
//     entities: [User, Token, Messages, Request, Friends, Group, Subscribers, Plan],
//     migrations: [],
//     subscribers: [],
// })


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "riders",
    password: "zGRHCAJWwVoc7r3KrGAq",
    database: "riders",
    synchronize: true,
    logging: false,
    entities: [User, Token, Messages, Request, Friends, Group, Subscribers, Plan],
    migrations: [],
    subscribers: [],
})
