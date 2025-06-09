import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bpm: number;

  @Column()
  spo2: number;

  @Column()
  fall: boolean;

  @CreateDateColumn()
  createdAt: Date;
}