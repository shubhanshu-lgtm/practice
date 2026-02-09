import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('notification_rule')
export class NotificationRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  event: string; // e.g., 'TaskCreated', 'WorkRequestAssigned'

  @Column()
  channel: string; // 'Email', 'InApp', 'Both'

  @Column({ type: 'text' })
  template: string;

  @Column({ default: true })
  isActive: boolean;
}
