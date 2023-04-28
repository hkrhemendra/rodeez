import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    // username: "riders",
    // password: "zGRHCAJWwVoc7r3KrGAq",
    username: "root",
    password: "",
    database: "riders",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*{.js,.ts}"],
    migrations: [],
    subscribers: [],
})
