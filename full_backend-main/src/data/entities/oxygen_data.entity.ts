import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('oxygen_data')
export class OxygenData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column({ name: 'oxygen_level', type: 'int', nullable: false })
  oxygenLevel: number;

  @CreateDateColumn({ name: 'recorded_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  // (опціонально) зв’язок з users, якщо є відповідна сутність:
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'customer_id' })
  // customer: User;
}
