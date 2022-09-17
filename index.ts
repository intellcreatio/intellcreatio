import "./global";
import { Client, Partials } from "discord.js";
import config from "./config";
import { ALL_INTENTS } from "./src/consts";
import { registerSlashCommands } from "./src/commands/register";
import { handleCommands } from "./src/commands/handler";

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

client.on("interactionCreate", (interaction) => {
    handleCommands(interaction);
});

// Run client after register slash commands
registerSlashCommands()
    .then(() => {
        if (config.run) {
            client.login(config.tokens.main);
        }
    })
    .catch((err) => {
        console.error(err);
    });
