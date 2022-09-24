import { DataSourceOptions } from "typeorm";
import { User } from "./entities/User";

export const DatabaseConfig: DataSourceOptions = {
    type: "sqlite",
    database: "./database.db",
    entities: [User],
    synchronize: true,
    logging: false,
};
