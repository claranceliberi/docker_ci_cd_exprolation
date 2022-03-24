import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meterNumber: string;

  @Column()
  token: string;

  @Column()
  ammount: number;

  @Column()
  active: boolean;

  @Column()
  createdAt: Date;
  @Column()
  expiryAt: Date;
}
