# IntellCreatio

Architecture for Discord bot, for convenient operation.

To configure the bot, you must refer to two files in this project, that is `config.ts` and `.env.example`.

**.env.example** - rename file to `.env` and configure the file.

**config.ts** - This file is needed to fully configure the bot, you can also add those fields you want but be careful with those fields that already exist.

# Locales

Locales storage in folder `locales` it's you can change in `src/consts.ts` change value const `LOCALES_FOLDER_NAME` to yourself

# Database configuration (TypeORM)

Locate in `database.config.ts`

## Entities

Located at the root of the project in the `entities` folder, where you create models for the database and then connect these entities in `database.config.ts`
