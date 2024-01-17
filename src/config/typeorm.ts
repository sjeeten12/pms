import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

import { join } from 'path';
import { SnakeNamingStrategy } from "src/snake-naming.strategy";

dotenvConfig({ path: '.env' });

export const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: 5432,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, '../modules/public/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../migrations/public/*{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);