import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('oxygen_data')
export class BloodOxygen {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  oxygen_level!: number;

  @Column()
  customer_id!: number;

  @Column({ type: 'timestamptz', default: () => 'NOW()', nullable: false })
recorded_at: Date;

}