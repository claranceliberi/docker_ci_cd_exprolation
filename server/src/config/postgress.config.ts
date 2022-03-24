import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// entities: ['/src/modules/**/entities/*.entity.ts'],
export const pgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ||'postgres',
  port: +process.env.POSTGRES_PORT || 5432,
  username:process.env.POSTGRES_USER || 'liberi',
  password:process.env.POSTGRES_PASSWORD || 'liberi',
  database: process.env.POSTGRES_DATABASE ||'elecmeter',
  autoLoadEntities: true,
  synchronize: true,
  migrations: ['dist/src/db/migrations.js'],
  cli: { migrationsDir: 'src/db/migrations' },
  keepConnectionAlive: true,
};

// POSTGRES_HOST=postgres
// POSTGRES_PORT=5432
// POSTGRES_USER=liberi
// POSTGRES_PASSWORD=liberi
// POSTGRES_DATABASE=elec-meter
