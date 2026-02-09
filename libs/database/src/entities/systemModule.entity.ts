import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { USER_ACCOUNT_STATUS } from "../../../constants/autenticationConstants/userContants";
import { Menu } from "./menu.entity";

@Entity('systemmodule')
export class SystemModule {
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

  @OneToMany(() => Menu, (menu) => menu.module)
  menus: Menu[]
}
