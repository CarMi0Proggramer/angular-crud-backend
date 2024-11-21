import { DataSource } from "typeorm";
import { Product } from "./entities/product";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "autorack.proxy.rlwy.net",
    port: 32432,
    username: "postgres",
    password: "VoVMvdfUTZdWrbclyNdvZJlSretQncab",
    database: "railway",
    entities: [Product],
    migrations: ["./migrations/**/*.ts"],
    synchronize: true,
    logging: true,
});
