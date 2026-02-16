import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import "reflect-metadata";
import { USER_ACCOUNT_STATUS, USER_GROUP, USER_LOGIN_SOURCE, USER_VERIFY_STATUS } from "../../../constants/autenticationConstants/userContants";
import { IsDefined } from "class-validator";
import { Exclude } from "class-transformer";
import { PLATFORM } from "../../../constants/commonConstants";
import { PermissionManager } from "./permissionManager.entity";
import { Department } from "./department.entity";
import { SystemModule } from "./systemModule.entity";


@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date

  @Column({ nullable: true })
  @IsDefined()
  name: string

  @Column({ nullable: true,  unique: true })
  @IsDefined()
  email: string

  @Column({ nullable: true, unique: true })
  @IsDefined()
  phoneNo: string

  @Column({ nullable: true })
  @IsDefined()
  avatar: string

  @Column({ nullable: true, select: false })
  @IsDefined()
  @Exclude()
  password: string

  @Column({
    type: 'enum',
    enum: USER_ACCOUNT_STATUS,
  })
  status: USER_ACCOUNT_STATUS;

  @Column({
    type: 'enum',
    enum: USER_VERIFY_STATUS,
  })
  verifyStatus: USER_VERIFY_STATUS;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  // @IsDefined()
  @JoinColumn({ name: "addedBy" })
  addedBy: User

  @ManyToOne(() => PermissionManager, (p) => p.users)
  @JoinColumn({ name: "permission" })
  @IsDefined()
  permission: PermissionManager

  // @Column()
  // roleId:string
  @Column({ nullable: true })
  @IsDefined()
  roleName: string

  @Column({
    type: 'enum',
    enum: USER_GROUP,
    nullable: true
  })
  @IsDefined()
  user_group: USER_GROUP

  @ManyToMany(() => Department, { nullable: true })
  @JoinTable({
    name: 'user_departments',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'departmentId', referencedColumnName: 'id' },
  })
  departments: Department[]

  @ManyToMany(() => SystemModule, { nullable: true })
  @JoinTable({
    name: 'user_modules',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'moduleId', referencedColumnName: 'id' },
  })
  modules: SystemModule[]

  @Column({
    type: 'enum',
    enum: USER_LOGIN_SOURCE,
    nullable: true
  })
  @IsDefined()
  loginSource: USER_LOGIN_SOURCE;

  @Column({
    type: 'enum',
    enum: PLATFORM,
    nullable: true
  })
  @IsDefined()
  platform: PLATFORM;

  @OneToMany(() => PermissionManager, (p) => p.createdBy)
  // @JoinColumn({ name: "permissionManager" })
  permissionManagers: PermissionManager[]  //permission createdBy

  // @ts-ignore - String reference used for circular dependency resolution
  @OneToMany('Team', (team) => team.teamLead)
  teamsLed: any[];

  // @ts-ignore - String reference used for circular dependency resolution
  @ManyToMany('Team', (team) => team.members)
  teams: any[];
}
