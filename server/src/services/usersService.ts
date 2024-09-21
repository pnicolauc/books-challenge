import bcrypt from "bcrypt";
import { ICreateUserParams, IUserResult, User } from "../models/user";
import { IOperationResult } from "../models/shared";

export class UserService {
  static async find(username: string): Promise<IOperationResult<IUserResult>> {
    try {
      const user = await User.findOne({ where: { username } });
      return {
        success: true,
        data: user ? user.dataValues : null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
      };
    }
  }

  static async createUser(
    user: ICreateUserParams
  ): Promise<IOperationResult<IUserResult>> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password!, saltRounds);
      const dbUser = await User.create({
        ...user,
        password: hashedPassword,
      } as any);

      if (!dbUser) {
        return {
          success: false,
          data: null,
        };
      }

      delete dbUser.dataValues.password;

      return {
        success: true,
        data: dbUser.dataValues,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
      };
    }
  }

  static async validateandGetUser(
    username: string,
    password: string
  ): Promise<IOperationResult<IUserResult>> {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return {
          success: false,
          data: null,
        };
      }

      const isValid = await bcrypt.compare(password, user.dataValues.password);

      if (!isValid) {
        return {
          success: false,
          data: null,
        };
      }

      delete user.dataValues.password;

      return {
        success: isValid,
        data: user.dataValues,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
      };
    }
  }
}
