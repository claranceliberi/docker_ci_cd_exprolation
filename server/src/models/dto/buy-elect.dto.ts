import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class BuyElecDto {
  @IsNotEmpty({ message: 'meter id must be provided' })
  @IsString({ message: 'meter id must be a string' })
  @Length(6, 6, { message: 'meter id must be 6 characters long' })
  meter: string;

  @IsNotEmpty({ message: 'ammount must be provided' })
  @IsInt({ message: 'ammount must be a number' })
  ammount: number;
}
