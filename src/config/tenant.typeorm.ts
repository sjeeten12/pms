import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from 'path';

dotenvConfig({ path: '.env' });
console.log(__dirname ,"   testt   ",  join(__dirname, '../modules/tenanted/**/*.entity{.ts,.js}'));
export const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: 5432,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [join(__dirname, '../modules/tenanted/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../migrations/tenanted/*{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
}

 export default registerAs('typeormTenant', () => config)
 export const connectionSource = new DataSource(config as DataSourceOptions);