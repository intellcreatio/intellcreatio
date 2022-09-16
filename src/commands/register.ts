import {
    REST,
    RESTPostAPIApplicationCommandsJSONBody,
    Routes,
    SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import path from "path";
import { INTERACTIONS_ROUTER_FILE_NAME } from "../consts";
import { InteractionsRouter } from "../types";
import config from "../../config";

// Parse interactions.json file
function parse() {
    const data = JSON.parse(
        fs
            .readFileSync(
                path.join(process.cwd(), INTERACTIONS_ROUTER_FILE_NAME)
            )
            .toString()
    ) as InteractionsRouter;

    for (const routing of Object.entries(data)) {
        // @ts-ignore
        const routes = Object.entries(data[routing.at(0)]);

        for (const route of routes) {
            // @ts-ignore
            data[routing.at(0)][route[0]] = route[1].replace(
                /\~/g,
                process.cwd()
            );
        }
    }

    return data;
}

export async function registerSlashCommands() {
    try {
        const routing = parse();
        const routes = Object.entries(routing.commands);
        const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

        routes.forEach((route) => {
            const command = require(route[1]).default as SlashCommandBuilder;
            commands.push(command.toJSON());
        });

        console.info(i18n.__("bot.refreshing_commands"));

        const rest = new REST({ version: "10" }).setToken(config.tokens.main);

        if (config.commands.registerInGuild) {
            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.DISCORD_CLIENT_ID,
                    config.commands.guild
                ),
                { body: commands }
            );
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                {
                    body: commands,
                }
            );
        }

        console.info(i18n.__("bot.successfully_reload_commands"));
    } catch (err) {
        console.error(err);
    }
}
