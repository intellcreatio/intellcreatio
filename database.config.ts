import { DataSourceOptions } from "typeorm";

export const DatabaseConfig: DataSourceOptions = {
    type: "sqlite",
    database: "./database.db",
    entities: [],
    synchronize: true,
    logging: false,
};
