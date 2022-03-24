import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './config';
import { Token } from './models/token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(pgConfig),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
