import process from "process";

if (!process.config.variables.node_install_npm) {
    console.error("Write in terminal please `yarn install`");
    process.exit(1);
}

import * as dotenv from "dotenv";
import config from "./config";
import chalk from "chalk";

process.stdout.write(
    chalk.white`Hello, while the bot starts I invite you to our Discord server https://discord.gg/epGhZ2sJXS ` +
        chalk.redBright`♥` +
        "\n"
);

dotenv.config();

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN?: string;
        }
    }
}

if (!process.env.DISCORD_TOKEN) {
    console.error(
        "In .env file there is no token for authorization of Discord bot"
    );

    process.exit(1);
}

config.tokens.main = process.env.DISCORD_TOKEN;
