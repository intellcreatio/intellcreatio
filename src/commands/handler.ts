import {
    CacheType,
    ChatInputCommandInteraction,
    Interaction,
    MessageContextMenuCommandInteraction,
    UserContextMenuCommandInteraction,
} from "discord.js";
import config from "../../config";
import { If } from "../types";
import { getInteractionsRouter } from "./register";

const clearCache = (command: string) => {
    if (config.devMode) {
        delete require.cache[command];
    }
};

export function handleCommands(interaction: Interaction) {
    if (!config.commands.registerInGuild) {
        handleChatInputCommands(interaction);
        handleUserContextCommands(interaction);
        handleMessageContextCommands(interaction);
    } else {
        gHandleChatInputCommands(interaction);
        gHandleUserContextCommands(interaction);
        gHandleMessageContextCommands(interaction);
    }
}

function handleUserContextCommands(interaction: Interaction) {
    if (
        !interaction.isContextMenuCommand() ||
        !interaction.inGuild() ||
        !interaction.isUserContextMenuCommand()
    )
        return;

    const { user_context_menu: userContextMenus } = getInteractionsRouter();

    const command = Object.keys(userContextMenus).find(
        (c) => c.toLowerCase() == interaction.commandName.toLowerCase()
    );

    if (command !== undefined) {
        const purpose = require(userContextMenus[command]);

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
                    file: userContextMenus[command],
                })
            );

            clearCache(userContextMenus[command]);

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
                clearCache(userContextMenus[command]);
            });
    } else {
        console.warn(
            i18n.__mf("bot.attempt_violate", {
                snowflake: interaction.user.id,
            })
        );
    }
}

function handleMessageContextCommands(interaction: Interaction) {
    if (
        !interaction.isContextMenuCommand() ||
        !interaction.inGuild() ||
        !interaction.isMessageContextMenuCommand()
    )
        return;

    const { message_context_menu: messageContextMenus } =
        getInteractionsRouter();

    const command = Object.keys(messageContextMenus).find(
        (c) => c.toLowerCase() == interaction.commandName.toLowerCase()
    );

    if (command !== undefined) {
        const purpose = require(messageContextMenus[command]);

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
                    file: messageContextMenus[command],
                })
            );

            clearCache(messageContextMenus[command]);

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
                clearCache(messageContextMenus[command]);
            });
    } else {
        console.warn(
            i18n.__mf("bot.attempt_violate", {
                snowflake: interaction.user.id,
            })
        );
    }
}

function handleChatInputCommands(interaction: Interaction) {
    if (
        !interaction.isChatInputCommand() ||
        !interaction.isCommand() ||
        !interaction.inGuild()
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

function gHandleUserContextCommands(interaction: Interaction) {
    if (
        !interaction.isContextMenuCommand() ||
        !interaction.isUserContextMenuCommand()
    )
        return;

    const { user_context_menu: userContextMenus } = getInteractionsRouter();

    const command = Object.keys(userContextMenus).find(
        (c) => c.toLowerCase() == interaction.commandName.toLowerCase()
    );

    if (command !== undefined) {
        const purpose = require(userContextMenus[command]);

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
                    file: userContextMenus[command],
                })
            );

            clearCache(userContextMenus[command]);

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
                clearCache(userContextMenus[command]);
            });
    } else {
        console.warn(
            i18n.__mf("bot.attempt_violate", {
                snowflake: interaction.user.id,
            })
        );
    }
}

function gHandleMessageContextCommands(interaction: Interaction) {
    if (
        !interaction.isContextMenuCommand() ||
        !interaction.isMessageContextMenuCommand()
    )
        return;

    const { message_context_menu: messageContextMenus } =
        getInteractionsRouter();

    const command = Object.keys(messageContextMenus).find(
        (c) => c.toLowerCase() == interaction.commandName.toLowerCase()
    );

    if (command !== undefined) {
        const purpose = require(messageContextMenus[command]);

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
                    file: messageContextMenus[command],
                })
            );

            clearCache(messageContextMenus[command]);

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
                clearCache(messageContextMenus[command]);
            });
    } else {
        console.warn(
            i18n.__mf("bot.attempt_violate", {
                snowflake: interaction.user.id,
            })
        );
    }
}

function gHandleChatInputCommands(interaction: Interaction) {
    if (!interaction.isChatInputCommand() || !interaction.isCommand()) return;

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

export type RegisterInGuild = typeof config.commands.registerInGuild;

type CommandImplementation = (
    interaction: If<
        RegisterInGuild,
        ChatInputCommandInteraction<CacheType>,
        ChatInputCommandInteraction<"cached" | "raw">
    >
) => Promise<STATUS_COMMAND>;

type ContextUserCommandImplementation = (
    interaction: If<
        RegisterInGuild,
        UserContextMenuCommandInteraction<CacheType>,
        UserContextMenuCommandInteraction<"cached" | "raw">
    >
) => Promise<STATUS_COMMAND>;

type ContextMessageCommandImplementation = (
    interaction: If<
        RegisterInGuild,
        MessageContextMenuCommandInteraction<CacheType>,
        MessageContextMenuCommandInteraction<"cached" | "raw">
    >
) => Promise<STATUS_COMMAND>;

/**
 * Use this function to advertise the command to be called
 */
export function defineCommand(fn: CommandImplementation) {
    return fn;
}

export function defineContextUserCommand(fn: ContextUserCommandImplementation) {
    return fn;
}

export function defineContextMessageCommand(
    fn: ContextMessageCommandImplementation
) {
    return fn;
}
