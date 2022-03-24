import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ResError } from './helpers/Error';
import { BuyElecDto } from './models/dto/buy-elect.dto';
import { Token } from './models/token.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/all')
  getAll(): Promise<Token[]> {
    return this.appService.getAllTokens();
  }
  @Post('/pay')
  buyToken(@Body() dto: BuyElecDto) {
    try {
      return this.appService.buyElec(dto);
    } catch (e) {
      return e.message();
    }
  }

  @Get('/get-days/:token')
  getDaysFromToken(@Param('token') token: string) {
    return this.appService.getDays(token);
  }

  @Get('/load-token/:token')
  async loadToken(
    @Param('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.appService.loadToken(token);
      if (result instanceof ResError) {
        if (result.status === 404) res.status(HttpStatus.NOT_FOUND);
        else if (result.status === 406) res.status(HttpStatus.NOT_ACCEPTABLE);
      }
      return result;
    } catch (e) {
      return e.message();
    }
  }
}
