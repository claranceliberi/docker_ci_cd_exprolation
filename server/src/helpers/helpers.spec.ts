import { Token } from 'src/models/token.entity';
import {
  calculateDaysPerAmmount,
  generate8DigitToken,
  getDaysFromToken,
  isTokenValid,
  tokenDaysHelper,
} from './helpers';

describe('helpers test', () => {
  it('should return 8 digit token', () => {
    expect(generate8DigitToken(100).length).toBe(8);
  });

  it('should throw error on less than 100 ammount', () => {
    expect(() => generate8DigitToken(8)).toThrow(
      'Ammount must be 100 or greater than 100',
    );
  });

  it('should throw error on invalid ammount', () => {
    expect(() => generate8DigitToken(108)).toThrow(
      'Ammount must be a multiple of 100',
    );
  });

  it('should throw error when buying with ammount more that 5 years', () => {
    expect(() => generate8DigitToken(100 * 365 * 6)).toThrow(
      "We can't generate token for more than 5 years",
    );
  });

  it('should return valid days', () => {
    expect(calculateDaysPerAmmount(200)).toBe('0002');
    expect(calculateDaysPerAmmount(500)).toBe('0005');
    expect(calculateDaysPerAmmount(100 * 900)).toBe('0900');
  });

  it('Token should have same days as ammount provided', () => {
    expect(getDaysFromToken(generate8DigitToken(100))).toBe(1);
    expect(getDaysFromToken(generate8DigitToken(100 * 432))).toBe(432);
  });

  it('Token should be valid', () => {
    expect(isTokenValid(generate8DigitToken(100))).toBe(true);
    expect(isTokenValid('AMATA')).toBe(false);
  });

  it('Token should return valid days', () => {
    const token: Token = {
      id: 67,
      meterNumber: '123456789',
      token: '10703081',
      ammount: 100,
      active: true,
      createdAt: new Date('2022-02-17T15:50:37.118Z'),
      expiryAt: new Date('2022-02-11T15:50:37.118Z'),
    };
    const days = tokenDaysHelper(token);

    expect(days).not.toBeNull();
    expect(days.totalDays).toBe(1);
  });

  it('Token should be expired', () => {
    const token: Token = {
      id: 67,
      meterNumber: '123456789',
      token: '10703081',
      ammount: 100,
      active: true,
      createdAt: new Date('2020-02-17T15:50:37.118Z'),
      expiryAt: new Date('2020-02-18T15:50:37.118Z'),
    };
    const days = tokenDaysHelper(token);

    expect(days).not.toBeNull();
    expect(days.isDateExpired).toBe(true);
  });

  it('should throw on invalid token', () => {
    const token: Token = {
      id: 67,
      meterNumber: '123456789',
      token: '1070308s',
      ammount: 100,
      active: true,
      createdAt: new Date('2022-02-17T15:50:37.118Z'),
      expiryAt: new Date('2022-02-18T15:50:37.118Z'),
    };

    expect(() => tokenDaysHelper(token)).toThrow('Token is not valid');
    token.token = 'SO';
    expect(() => tokenDaysHelper(token)).toThrow('Token is not valid');
    token.token = '1I234567';
    expect(() => tokenDaysHelper(token)).toThrow('Token is not valid');
  });
});
