import { SlashCommandBuilder } from "discord.js";
import { defineCommand, STATUS_COMMAND } from "../../src/commands/handler";

export const command = defineCommand(async (interaction) => {
    interaction.reply("It's example command");
    return STATUS_COMMAND.OK;
});

export default new SlashCommandBuilder()
    .setName("example")
    .setDMPermission(false)
    .setDescription("Example command");
