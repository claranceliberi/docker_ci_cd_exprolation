import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { pgConfig } from './config';
import { ResError } from './helpers/Error';
import { isTokenValid, tokenDaysHelper } from './helpers/helpers';
import { BuyElecDto } from './models/dto/buy-elect.dto';
import { Token } from './models/token.entity';
import { IDays } from './types';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    jest.setTimeout(60000);
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRoot(pgConfig),
        TypeOrmModule.forFeature([Token]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return bought loaded Token', async () => {
      const buyToken: BuyElecDto = {
        ammount: 100,
        meter: '123456789',
      };

      const result = (await appController.buyToken(buyToken)) as Token;
      expect(result).not.toBeNull();
      expect(result.ammount).toBe(buyToken.ammount);
      expect(result.meterNumber).toBe(buyToken.meter);
      expect(isTokenValid(result.token)).toBe(true);
      expect(tokenDaysHelper(result).remainingDays).toBeGreaterThan(0);
    });

    it('Get all tokens', async () => {
      const result = (await appController.getAll()) as Token[];
      expect(result).not.toBeNull();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should fail to buy Token', async () => {
      const buyToken: BuyElecDto = {
        ammount: 109,
        meter: '123456789',
      };

      const result = (await appController.buyToken(buyToken)) as ResError;

      expect(result).not.toBeNull();
      expect(result.message).toBe('Ammount must be a multiple of 100');
    });

    it('should get days Token', async () => {
      const days = 165;
      const buyToken: BuyElecDto = {
        ammount: 100 * days,
        meter: '123456789',
      };

      const result = (await appController.buyToken(buyToken)) as Token;

      const _days = (await appController.getDaysFromToken(
        result.token,
      )) as IDays;

      expect(_days.totalDays).toBe(days);
    });

    it('Should get not found on get  days', async () => {
      const result = (await appController.getDaysFromToken(
        '123456789',
      )) as ResError;
      expect(result).not.toBeNull();
      expect(result.status).toBe(404);
      expect(result.message).toBe('Unknown token');
    });
  });
});
