import { DiscordAPIError, RESTJSONErrorCodes } from "discord.js";
import { defineButton } from "../../src/buttons/register";

export default defineButton(async (interaction) => {
    interaction.deferUpdate();
    interaction.message.delete().catch((err: DiscordAPIError) => {
        if (err.code != RESTJSONErrorCodes.UnknownMessage) {
            console.info(err);
        }
    });
});
