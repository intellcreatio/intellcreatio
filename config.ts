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
        /**
         * This field is now in the RegisterInGuild type, change two fields if necessary
         */
        registerInGuild: FALSE,
        guild: "",
    },
    locale: "en",
    devMode: true,
};

export default config;
