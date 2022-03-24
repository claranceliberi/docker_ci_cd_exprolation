import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// entities: ['/src/modules/**/entities/*.entity.ts'],
export const pgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'liberi',
  password: 'liberi',
  database: 'elecmeter',
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
