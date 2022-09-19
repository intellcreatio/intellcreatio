/**
 * !Important!
 * config.tokens don't touch
 */

const config = {
    run: true,
    tokens: {
        main: "",
    },
    commands: {
        /**
         * This field is now in the RegisterInGuild type, change two fields if necessary
         */
        registerInGuild: false as const,
        guild: "",
    },
    locale: "en",
    devMode: true,
};

export default config;
