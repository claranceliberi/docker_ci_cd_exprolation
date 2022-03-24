import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResError } from './helpers/Error';
import {
  generate8DigitToken,
  getDaysFromToken,
  tokenDaysHelper,
} from './helpers/helpers';
import { BuyElecDto } from './models/dto/buy-elect.dto';
import { Token } from './models/token.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllTokens(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  buyElec(dto: BuyElecDto): Promise<Token | ResError> {
    try {
      const token = generate8DigitToken(dto.ammount);

      const date = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + getDaysFromToken(token));

      return this.tokenRepository.save({
        token,
        ammount: dto.ammount,
        meterNumber: dto.meter,
        createdAt: date,
        expiryAt: expiryDate,
        active: true,
      });
    } catch (e) {
      return Promise.resolve(new ResError(500, e.message));
    }
  }

  async getDays(token: string) {
    const _token = await this.tokenRepository.findOne({ token });
    if (!_token) return new ResError(404, 'Unknown token');
    return tokenDaysHelper(_token);
  }

  async loadToken(token: string) {
    const _token = await this.tokenRepository.findOne({ token });
    if (!_token) return new ResError(404, 'Unknown token');
    if (!_token.active) return new ResError(406, 'Token is used already');
    _token.active = false;
    return this.tokenRepository.save(_token);
  }
}
