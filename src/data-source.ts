import { DataSource } from "typeorm";
import { Product } from "./entities/product";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "carlos",
    password: "carlos2006",
    database: "crud-db",
    entities: [Product],
    migrations: ["./migrations/**/*.ts"],
    synchronize: true,
    logging: true,
});
