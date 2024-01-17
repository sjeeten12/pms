

import { join } from 'path';
import { SnakeNamingStrategy } from 'src/snake-naming.strategy';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'pms',
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/public/*{.ts,.js}')],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
}
};