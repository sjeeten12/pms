import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTenantConnection } from '../../tenancy/tenancy.utils';
import { getManager, Repository, DataSource } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private datasource: DataSource
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    tenant = await this.tenantsRepository.save(tenant);

    const schemaName = `tenant_${tenant.id}`;
    const query = `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`;
    await this.datasource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const connection = await getTenantConnection(`${tenant.id}`);
    console.log("conn", tenant.id)
   // await connection.initialize().then(async ()=>{
      console.log("test inside")
      await connection.runMigrations({transaction: "all"})
      await connection.close();
      return tenant 
    //}).catch(err=>{ console.log(err)});
    

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
