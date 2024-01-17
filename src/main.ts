import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { DataSource, getConnection, getManager } from 'typeorm';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { config } from './config/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(tenancyMiddleware);

  const appDataSource = new DataSource({...(config as PostgresConnectionOptions),})
  await appDataSource.initialize();
  try{
  await appDataSource.runMigrations()
  }catch(err){
    console.log(err)
  }

  const schemas = await appDataSource.query('select schema_name as name from information_schema.schemata;');

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations()
      await connection.close();
    }
  }
  await app.listen(3000);
}
bootstrap();
