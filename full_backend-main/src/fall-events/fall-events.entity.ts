import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('fall_events')
export class FallEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number; // якщо один користувач - можна згодом прибрати або поставити 1

  @CreateDateColumn({ type: 'timestamptz' })
  detected_at: Date;

  @Column({ default: false })
  is_acknowledged: boolean;

  @Column({ nullable: true })
  location: string;
}
