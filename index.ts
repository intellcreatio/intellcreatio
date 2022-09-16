import { Client, Partials } from "discord.js";
import config from "./config";
import { ALL_INTENTS } from "./src/consts";
import "./global";

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

client.on("ready", (client) => {
    console.info("bot started");
});

client.login(config.tokens.main);
