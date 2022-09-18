/**
 * !Important!
 * config.tokens don't touch
 */

export type RegisterInGuild = false;

const config = {
    run: true,
    tokens: {
        main: "",
    },
    commands: {
        /**
         * This field is now in the RegisterInGuild type, change two fields if necessary
         */
        registerInGuild: false,
        guild: "",
    },
    locale: "en",
    devMode: true,
};

export default config;
