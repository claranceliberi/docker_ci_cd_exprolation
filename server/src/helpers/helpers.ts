import { Token } from 'src/models/token.entity';
import { IDays } from 'src/types';

export function generate8DigitToken(ammout: number): string {
  if (ammout < 100) throw new Error('Ammount must be 100 or greater than 100');
  if (ammout % 100 !== 0) throw new Error('Ammount must be a multiple of 100');

  const d = calculateDaysPerAmmount(ammout);

  if (parseInt(d) > 5 * 365)
    throw new Error("We can't generate token for more than 5 years");

  return [r(), d[0], r(), d[1], r(), d[2], r(), d[3]].join('');
}

export function calculateDaysPerAmmount(ammount: number): string {
  const days = Math.floor(ammount / 100);
  return days.toString().padStart(4, '0');
}

export function r() {
  return Math.floor(Math.random() * 10);
}

export function getDaysFromToken(token: string): number {
  const parts = token.split('');
  return parseInt([parts[1], parts[3], parts[5], parts[7]].join(''));
}

export function isTokenValid(token: string): boolean {
  return token.length === 8 && getDaysFromToken(token) > 0;
}

export function tokenDaysHelper(token: Token): IDays {
  if (!isTokenValid(token.token)) throw new Error('Token is not valid');

  const today = new Date();
  const boughtAt = token.createdAt;
  const totalDays = getDaysFromToken(token.token);
  const expiryDate = token.expiryAt ?? boughtAt;
  if (!token.expiryAt) expiryDate.setDate(boughtAt.getDate() + totalDays);
  const isDateExpired = today > expiryDate;

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const remainingDays = isDateExpired
    ? 0
    : Math.round(Math.abs(((expiryDate as any) - (today as any)) / oneDay));

  return { boughtAt, expiryDate, isDateExpired, totalDays, remainingDays };
}
