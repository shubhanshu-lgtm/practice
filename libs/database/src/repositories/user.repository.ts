import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserI } from '../../../interfaces/authentication/user.interface';
import { USER_GROUP, USER_VERIFY_STATUS } from '../../../constants/autenticationConstants/userContants';
import { PermissionManager } from '../entities/permissionManager.entity';
import { paginate } from '../../../utils/basicUtils';
import { IPaginationObject } from '../../../interfaces/commonTypes/custom.interface';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    private mapObject(obj: any): any {
        let resObj: any = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (key === 'id' && obj[key] !== undefined && obj[key] !== null) resObj[key] = obj[key].toString();
                else if (key === 'user_group' && obj[key] !== undefined && obj[key] !== null) resObj[key] = obj[key] as USER_GROUP;
                else if (obj[key] !== undefined && obj[key] !== null) resObj[key] = obj[key];
            }
        }

        return resObj;
    }

    async checkUserEmailExist(email: string): Promise<boolean> {
        try {
            const count = await this.userRepository.count({ where: { email } });
            return count > 0;
        } catch (error) {
            throw error;
        }
    }

    async insertDefaultUser(input: UserI.InsertDefaultUser): Promise<User> {
        try {
            const { email, verifyStatus, password, status, user_group, loginSource, name } = input;

            const insertVal = { email, verifyStatus, password, status, user_group, loginSource, name };

            const user = await this.userRepository.save(this.userRepository.create(insertVal));
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne({
                where: { email }
            });
        } catch (error) {
            throw error;
        }
    }


    async insertUser(input: UserI.AddOrUpdateUser): Promise<User | null> {
        try {
            const { phoneNo, status, verifyStatus, permission, roleName, user_group, email, password, name } = input;

            const insertVal = { phoneNo, status, verifyStatus, permission, roleName, user_group, email, password, name };
            const fields = this.mapObject(insertVal);

            if (permission) {
                let pRef = new PermissionManager();
                pRef.id = permission;
                fields.permission = pRef;
            }

            const user = await this.userRepository.save(this.userRepository.create(fields));
            return user as any;
        } catch (error) {
            throw error;
        }
    }

    async addOrUpdateUser(input: UserI.AddOrUpdateUser): Promise<number | null> {
        try {
            const { phoneNo, avatar, status, verifyStatus, id, permission, roleName, user_group, email, name, addedBy, password, loginSource} = input;

            const insertVal = { phoneNo, status, avatar, verifyStatus, permission, roleName, user_group, email, name, password, loginSource}
            const fields = this.mapObject(insertVal);

            if (permission) {
                let pRef = new PermissionManager();
                pRef.id = permission;
                fields.permission = pRef;
            }

            if (addedBy) {
                let addedByRef = new User();
                addedByRef.id = addedBy;
                fields.addedBy = addedByRef;
            }

            let userId = null;
            if (id) {
                const r = await this.userRepository.update({ id}, fields);
                if (r.affected && r.affected > 0) {
                    userId = id;
                }
            } else {
                const user = await this.userRepository.insert(this.userRepository.create(fields));
                const userJson = JSON.parse(JSON.stringify(user))
                if (userJson.identifiers && userJson.identifiers.length > 0 && userJson.identifiers[0].id) {
                    userId = userJson.identifiers[0].id;
                }
            }

            return userId;
        } catch (error) {
            throw error;
        }
    }

    async updateRoleAndPermission(input: UserI.UpdateRoleAndPermission): Promise<void> {
        try {
            const { permission, roleName, userId } = input;

            let permissionRef = new PermissionManager();
            permissionRef.id = permission;

            await this.userRepository.update(userId, {
                permission: permissionRef,
                roleName,
            });
            return;
        } catch (error) {
            throw error;
        }
    }

    async getUserIdByPhoneNo(phoneNo: string): Promise<UserI.UserSchema | null> {
        try {
            const doc = await this.userRepository.findOne({ where: { phoneNo }, select: { id: true, status: true, verifyStatus: true, user_group: true } });
            return (doc as any) || null;
        } catch (error) {
            throw error;
        }
    }

    async updateUserStatus(input: UserI.UpdateUserStatus): Promise<void> {
        try {
            const { userId, status, verifyStatus, password } = input;
            const updateFields = this.mapObject({ status, verifyStatus, password })
            await this.userRepository.update(userId.toString(), updateFields);
            return;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<UserI.UserSchema | null> {
        try {
            const selectFields: any = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                verifyStatus: true,
                password: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                createdAt: true,
            };

            const user = await this.userRepository.findOne({ 
                where: { email }, 
                select: selectFields,
                relations: ['modules', 'departments', 'teams'] 
            });

            return (user as any) || null;
        } catch (error) {
            throw error;
        }
    }

    

    async getUnverifiedUserByPhone(phoneNo: string, getPassword = false): Promise<(UserI.UserSchema & { passwordExist: boolean }) | null> {
        try {
            const selectFields: any = {
                name: true,
                email: true,
                phoneNo: true,
                verifyStatus: true,
                password: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                id: true,
            };

            const user = await this.userRepository.findOne({ where: { phoneNo }, select: selectFields, loadRelationIds: true });

            if (user && user.password && !getPassword) {
                user.password = '';
            }

            return (user as any) || null;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUserId(userId: number, showPassword = false): Promise<UserI.UserSchema | null> {
        try {
            const selectFields: any = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                addedBy: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
                createdAt: true,
            };

            if (showPassword) selectFields.password = true;

            const user = await this.userRepository.findOne({ where: { id: userId, verifyStatus: USER_VERIFY_STATUS.VERIFIED }, loadRelationIds: true });
            if (!user) {
                return null;
            }

            let result = {}
            for (const key in selectFields) {
                if (Object.prototype.hasOwnProperty.call(selectFields, key)) {
                    if (user[key])
                        result[key] = user[key];

                }
            }
            return (result as any) || null;
        } catch (error) {
            console.log("Error get userById db", error)
            throw error;
        }
    }

    async getUserByGroup(user_group: USER_GROUP): Promise<UserI.UserSchema[] | null> {
        try {
            const selectFields: any = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true
            };

            const user = await this.userRepository.find({ where: { user_group, verifyStatus: USER_VERIFY_STATUS.VERIFIED }, select: selectFields });
            return (user as any) || null;
        } catch (error) {
            throw error;
        }
    }

    async getUserByRoleAndGroup(user_group: USER_GROUP, roleName: string): Promise<UserI.UserSchema | null> {
        try {
            const selectFields: any = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
            };

            const user = await this.userRepository.findOne({ where: { user_group, verifyStatus: USER_VERIFY_STATUS.VERIFIED, roleName: roleName }, select: selectFields });
            return (user as any) || null;
        } catch (error) {
            throw error;
        }
    }

    async updateUserAccountStatus(input: UserI.UpdateUserAccountStatus): Promise<void> {
        try {
            const { status, userId } = input;
            await this.userRepository.update(userId.toString(), { status });
            return;
        }
        catch (error) {  
            throw error;
        }
    }

    async getUsersByFilter(input: UserI.GetUsersByFilter): Promise<IPaginationObject> {
        try {
            const { user_group, page, pageSize, status, search } = input;
            const { currentPage, limit, offset } = paginate(page, pageSize);

            const selectFields: any = {
                id: true,
                name: true,
                email: true,
                phoneNo: true,
                avatar: true,
                roleName: true,
                user_group: true,
                status: true,
            };

            const fields = this.mapObject({ user_group, status });
            fields.verifyStatus = USER_VERIFY_STATUS.VERIFIED;

            let searches = []
            if (search) {
                searches.push({ email: ILike(`${search}%`) });
                searches.push({ name: ILike(`${search}%`) });
                searches.push({ phoneNo: ILike(`${search}%`) });
            }


            const queryBuilder = this.userRepository
                .createQueryBuilder('user')
                .select([])
                .where(fields)
                .andWhere(searches)
                .skip(offset)
                .take(limit)

            queryBuilder.addOrderBy('user.createdAt', `DESC`);

            for (const key in selectFields) {
                if (selectFields[key]) {
                    queryBuilder.addSelect(`user.${key}`);
                }
            }
            const [userList, count] = await queryBuilder.getManyAndCount();

            const totalPages = Math.ceil(count / limit);
            const paginateObject: IPaginationObject = {
                docs: userList,
                hasNextPage: input.page < totalPages,
                hasPrevPage: input.page > 1,
                limit: limit,
                page: currentPage,
                totalDocs: count,
                totalPages,
            };

            return paginateObject;
        } catch (error) {
            throw error;
        }
    }


    async getUserCounts(input: { groups: USER_GROUP[] }): Promise<[{ userCount: number, user_group: string }]> {
        try {
            const { groups } = input;
            const groupIN = groups.map(() => `?`).join(', ');

            let whereF = `verifyStatus = 'VERIFIED'`;
            if (groupIN) {
                whereF += ` and user_group IN(${groupIN})`;
            }

            const query = `SELECT count(id) AS userCount, user_group FROM user 
            WHERE ${whereF}
            GROUP BY user_group;`;

            const result = await this.userRepository.query(query, groups);
            return result;
        } catch (error) {
            throw error;
        }
    }

}
