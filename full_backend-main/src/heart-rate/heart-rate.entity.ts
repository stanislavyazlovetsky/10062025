import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pulse_data')
export class HeartRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
 pulse!: number;


  @Column()
  customer_id!: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()', nullable: false })
recorded_at: Date;

}
