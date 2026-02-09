import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { USER_ACCOUNT_STATUS } from "../../../constants/autenticationConstants/userContants";
import { Team } from "./team.entity";

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column({ unique: true })
  name: string

  @Column({ nullable: true, unique: true })
  code: string

  @Column({
    type: 'enum',
    enum: USER_ACCOUNT_STATUS,
    default: USER_ACCOUNT_STATUS.ACTIVE
  })
  status: USER_ACCOUNT_STATUS

  // @ts-ignore - String reference used for circular dependency resolution
  @OneToMany('Team', (team) => team.department)
  teams: Team[];
}
