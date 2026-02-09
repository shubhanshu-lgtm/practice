import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity('document_classification')
export class DocumentClassification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., "Confidential", "Internal", "Public"

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
