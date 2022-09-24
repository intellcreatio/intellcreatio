import process from "process";

if (!process.config.variables.node_install_npm) {
    console.error("Write in terminal please `yarn install`");
    process.exit(1);
}

import * as dotenv from "dotenv";
import config from "./config";
import chalk from "chalk";
import i18n from "i18n";
import { LOCALES_FOLDER_NAME } from "./src/consts";
import path from "path";

import "reflect-metadata";
import { DataSource } from "typeorm";
import { DatabaseConfig } from "./database.config";

i18n.configure({
    locales: ["en", "ru"],
    directory: path.join(process.cwd(), LOCALES_FOLDER_NAME),
    defaultLocale: config.locale,
    fallbacks: { "en-*": "en" },
    autoReload: true,
});

global.i18n = i18n;

process.stdout.write(
    chalk.white`Hello, while the bot starts I invite you to our Discord server https://discord.gg/epGhZ2sJXS ` +
        chalk.redBright`♥` +
        "\n"
);

dotenv.config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            DISCORD_CLIENT_ID: string;
        }
    }

    var AppDataSource: DataSource;
}

if (!process.env.DISCORD_TOKEN) {
    console.error(
        "In .env file there is no token for authorization of Discord bot"
    );

    process.exit(1);
}

if (!process.env.DISCORD_CLIENT_ID) {
    console.error(
        "In .env file there is no application id for register slash commands and other"
    );

    process.exit(1);
}

config.tokens.main = process.env.DISCORD_TOKEN;

global.AppDataSource = new DataSource(DatabaseConfig);

AppDataSource.initialize()
    .then((d) => {
        if (d.isInitialized) {
            console.info(i18n.__("database.connected"));
        }
    })
    .catch((error) => console.log(error));
