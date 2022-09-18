import { ContextMenuCommandBuilder } from "discord.js";
import {
    defineContextUserCommand,
    STATUS_COMMAND,
} from "../../src/commands/handler";

export const command = defineContextUserCommand(async (interaction) => {
    interaction.reply({
        content: "❤",
        ephemeral: true,
    });

    console.info(interaction.user.tag);

    return STATUS_COMMAND.OK;
});

export default new ContextMenuCommandBuilder();
