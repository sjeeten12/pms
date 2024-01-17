import { Connection, DataSource, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {config } from '../../config/tenant.typeorm';

export async function getTenantConnection(tenantId: string): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  console.log("yaha ayo", connectionName)
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    console.log("bhitra ta")
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }
console.log("yeta ta")
  const app= await new DataSource({
    ...(config as PostgresConnectionOptions),
    schema: connectionName,
  });
  return await app.initialize();
}
