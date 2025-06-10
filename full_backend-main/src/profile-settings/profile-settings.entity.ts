// src/profile-settings/profile-settings.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('profile_settings')
export class ProfileSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('int')
  age: number;

  @Column('numeric', { precision: 5, scale: 2 })
  weight: number;

  @Column('int')
  growth: number;

  @Column('int')
  cups_of_water: number;

  @Column('int')
  heart_rate_max: number;

  @Column('int')
  heart_rate_min: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
