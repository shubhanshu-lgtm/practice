import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import "reflect-metadata";
import { USER_ACCOUNT_STATUS, USER_GROUP, USER_LOGIN_SOURCE, USER_VERIFY_STATUS } from "../../../constants/autenticationConstants/userContants";
import { PERMISSIONS } from "../../../constants/autenticationConstants/permissionManagerConstants";
import { User } from "./user.entity";

@Entity('permissionmanager')
export class PermissionManager {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', default: () => 'now()'})
    createdAt: Date

    @Column()
    roleName: string
    // @Column()
    // roleId: number

    @ManyToOne(() => User, u => u.permissionManagers)
    @JoinColumn({ name: "createdBy" })
    createdBy: User

    @Column('json', {nullable: true})
    permissions: {
        module: number,
        action: {
            [PERMISSIONS.ADD]: boolean,
            [PERMISSIONS.READ]: boolean,
            [PERMISSIONS.UPDATE]: boolean,
            [PERMISSIONS.DELETE]: boolean,
        }
    }[]
    @Column({
        type: 'enum',
        enum: USER_GROUP,
      })
    user_group: USER_GROUP;

    @OneToMany(() => User, u => u.permission)
    @JoinColumn({ name: "user" })
    users:User[]     // reference of user assigned permission
}
