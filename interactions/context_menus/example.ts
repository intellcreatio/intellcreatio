import { ContextMenuCommandBuilder } from "discord.js";
import { User } from "../../entities/User";
import {
    defineContextUserCommand,
    STATUS_COMMAND,
} from "../../src/commands/handler";

export const command = defineContextUserCommand(async (interaction) => {
    interaction.reply({
        content: "❤",
        ephemeral: true,
    });

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({
        discordId: interaction.targetUser.id,
    });

    if (!user) {
        const user = userRepository.create({
            discordId: interaction.targetUser.id,
            tag: interaction.targetUser.tag,
        });

        await userRepository.save(user);
        console.info(interaction.targetUser.tag);
        console.info("Registered new user in database");
    } else {
        console.info(user);
        console.info("Already registered");
    }

    return STATUS_COMMAND.OK;
});

export default new ContextMenuCommandBuilder();
