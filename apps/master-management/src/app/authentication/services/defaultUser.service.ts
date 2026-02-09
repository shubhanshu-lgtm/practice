import { Injectable } from '@nestjs/common';
import { USER_ACCOUNT_STATUS, DEFAULT_USER_ROLES, USER_VERIFY_STATUS, USER_GROUP, USER_LOGIN_SOURCE } from '../../../../../../libs/constants/autenticationConstants/userContants';
import { UserRepository } from '../../../../../../libs/database/src/repositories/user.repository';
import { PermissionManagerRepository } from '../../../../../../libs/database/src/repositories/permissionManager.repository';
import { UserI } from '../../../../../../libs/interfaces/authentication/user.interface';
import { generatePasswordHash } from '../../../../../../libs/utils/bcryptUtil';

const defaultUser = {
  email: 'shubhanshu@intercert.com',
  password: 'Pass@123',
  userRole: DEFAULT_USER_ROLES.SUPER_ADMIN,
  name: 'Shubhanshu Kumar',
};

@Injectable()
export class DefaultUserService {
  constructor(private readonly userModel: UserRepository, private readonly permissionModel: PermissionManagerRepository) { }

  async addDefaultUser(): Promise<void> {
    try {
      const checkIfExist = await this.userModel.checkUserEmailExist(defaultUser.email);
      if (checkIfExist) {
        console.log('Default user already exists.');
        return;
      }

      console.log('Creating default user...');
      const passwordHash = await generatePasswordHash(defaultUser.password);
      const userObj: UserI.InsertDefaultUser =
      {
        password: passwordHash,
        email: defaultUser.email.toLowerCase().trim(),
        verifyStatus: USER_VERIFY_STATUS.VERIFIED,
        status: USER_ACCOUNT_STATUS.ACTIVE,
        user_group: USER_GROUP.SUPER_ADMIN,
        loginSource: USER_LOGIN_SOURCE.LOCAL,
        name: defaultUser.name,
      };

      const user = await this.userModel.insertDefaultUser(userObj);
      console.log('Default user created with ID:', user.id);
      
      return;
    } catch (error) {
      console.log("Error adding admin user", error);
      throw error;
    }
  }
}
