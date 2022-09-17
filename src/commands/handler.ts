import { ChatInputCommandInteraction, Interaction, Locale } from "discord.js";
import config from "../../config";
import { getInteractionsRouter } from "./register";

const clearCache = (command: string) => {
    if (config.devMode) {
        delete require.cache[command];
    }
};

/**
 * It's method handling only guild commands
 */
export function handleCommands(interaction: Interaction) {
    if (
        !interaction.isChatInputCommand() ||
        !interaction.inGuild() ||
        !interaction.isCommand()
    )
        return;

    const { commands } = getInteractionsRouter();

    const command = Object.keys(commands).find(
        (c) => c.toLowerCase() == interaction.commandName.toLowerCase()
    );

    if (command !== undefined) {
        const purpose = require(commands[command]);

        // If command is missing
        if (purpose == undefined || purpose.command == undefined) {
            interaction.reply({
                content: i18n.__({
                    phrase: "bot.implementation_missing",
                    locale: interaction.locale,
                }),
                ephemeral: true,
            });

            console.warn(
                i18n.__mf("bot.implement", {
                    command,
                    file: commands[command],
                })
            );

            clearCache(commands[command]);

            return;
        }

        const result = purpose.command(
            interaction
        ) as ReturnType<CommandImplementation>;

        result
            .then((status) => {
                switch (status) {
                    case STATUS_COMMAND.OK:
                    case STATUS_COMMAND.ERROR:
                    case STATUS_COMMAND.NOT_CORRECT:
                    case STATUS_COMMAND.PROBLEM:
                        break;
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                clearCache(commands[command]);
            });
    } else {
        console.warn(
            i18n.__mf("bot.attempt_violate", {
                snowflake: interaction.user.id,
            })
        );
    }
}

export enum STATUS_COMMAND {
    OK,
    PROBLEM,
    ERROR,
    // it's status be like undefined
    NOT_CORRECT,
}

type CommandImplementation = (
    interaction: ChatInputCommandInteraction<"cached" | "raw">
) => Promise<STATUS_COMMAND>;

/**
 * Use this function to advertise the command to be called
 */
export function defineCommand(fn: CommandImplementation) {
    return fn;
}
