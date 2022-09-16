import { SlashCommandBuilder } from "discord.js";

export default new SlashCommandBuilder()
    .setName("example")
    .setDMPermission(false)
    .setDescription("Example command");
