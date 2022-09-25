import {
    ButtonInteraction,
    CacheType,
    Interaction,
    SelectMenuInteraction,
} from "discord.js";

import config from "../../config";
import { getInteractionsRouter } from "../commands/register";

const clearCache = (command: string) => {
    if (config.devMode) {
        delete require.cache[command];
    }
};

const router = getInteractionsRouter();

export function handleButtons(interaction: Interaction<CacheType>) {
    if (interaction.isButton()) {
        const buttons = Object.entries(router.buttons);
        const button = buttons.find((v) => v[0] === interaction.customId);
        if (button) {
            const path = button[1];
            const fn = require(path).default as (
                interaction: ButtonInteraction<CacheType>
            ) => Promise<void>;
            fn(interaction)
                .then(() => {
                    clearCache(button[1]);
                })
                .catch((err) => console.error(err));
        }
    }

    if (interaction.isSelectMenu()) {
        const buttons = Object.entries(router.select_menus);
        const button = buttons.find((v) => v[0] === interaction.customId);
        if (button) {
            const path = button[1];
            const fn = require(path).default as (
                interaction: SelectMenuInteraction<CacheType>
            ) => Promise<void>;

            fn(interaction)
                .then(() => {
                    clearCache(button[1]);
                })
                .catch((err) => console.error(err));
        }
    }
}

export function defineButton(
    fn: (interaction: ButtonInteraction<CacheType>) => Promise<void>
) {
    return fn;
}

export function defineSelectMenu(
    fn: (interaction: SelectMenuInteraction<CacheType>) => Promise<void>
) {
    return fn;
}
