import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { USER_ACCOUNT_STATUS } from "../../../constants/autenticationConstants/userContants";
import { SystemModule } from "./systemModule.entity";

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column()
  name: string

  @Column({ nullable: true })
  path: string

  @Column({ type: 'int', default: 0 })
  sortOrder: number

  @Column({
    type: 'enum',
    enum: USER_ACCOUNT_STATUS,
    default: USER_ACCOUNT_STATUS.ACTIVE
  })
  status: USER_ACCOUNT_STATUS

  @ManyToOne(() => SystemModule, (module) => module.menus)
  @JoinColumn({ name: 'moduleId' })
  module: SystemModule

  @ManyToOne(() => Menu, (menu) => menu.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[]
}
