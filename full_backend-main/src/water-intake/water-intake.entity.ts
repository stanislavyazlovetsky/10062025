import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('water_intake')
export class WaterIntake {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  cups: number;
}
