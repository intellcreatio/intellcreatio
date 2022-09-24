/**
 * !Important!
 * config.tokens don't touch
 */

/**
 * Use this consts for configuration
 */
const FALSE = false as const;
const TRUE = true as const;

const config = {
    run: true,
    tokens: {
        main: "",
    },
    commands: {
        registerInGuild: FALSE,
        guild: "",
    },
    locale: "en",
    devMode: true,
};

export default config;
