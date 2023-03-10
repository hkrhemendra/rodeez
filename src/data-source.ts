
import { DataSource } from "typeorm"
import { Friends, Group, Request } from "./entity/Friends"
import { Messages } from "./entity/Message"
import { User, Token } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "riders",
    synchronize: true,
    logging: false,
    entities: [User, Token, Messages, Request, Friends, Group],
    migrations: [],
    subscribers: [],
})
