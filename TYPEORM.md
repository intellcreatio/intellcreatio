[TypeORM](https://typeorm.io/) will play a key role in this implementation

```shell
yarn add typeorm reflect-metadata -E
```

Since TypeORM supports many drivers we can install the one we need.

(By default we installed SQLite)

-   ##### For MySQL or MariaDB

    `yarn add mysql -E`

-   ##### For PostgreSQL or CockroachDB

    `yarn add pg -E`

-   ##### For SQLite

    `yarn add sqlite3 -E`

-   ##### For Microsoft SQL Server

    `yarn add mssql -E`

-   ##### For sql.js

    `yarn add sql.js -E`

-   ##### For Oracle
    `yarn add oracledb -E`

Since this is not a complete TypeORM documentation and only information that will be most useful to those who will use this library, we strongly recommend that you read the official [TypeORM documentation](https://typeorm.io/)
