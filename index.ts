import "./global";
import { Client, Partials } from "discord.js";
import config from "./config";
import { ALL_INTENTS } from "./src/consts";
import { registerSlashCommands } from "./src/commands/register";

const client = new Client({
    intents: ALL_INTENTS,
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ],
});

client.on("ready", () => {
    console.info(i18n.__("bot.started"));
});

if (config.run) {
    client.login(config.tokens.main);
}

registerSlashCommands();
