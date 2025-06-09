import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('pulse_data')
export class PulseData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column({ type: 'int', nullable: false })
  pulse: number;

  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  // (опціонально) зв’язок з users, якщо є відповідна сутність:
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'customer_id' })
  // customer: User;
}
