import { DataTypes } from "sequelize";
import dbClient from "./dbClient";
import typia from "typia";

typia.createIs<ICreateUserParams>();
typia.createIs<ILoginUserParams>();
typia.createIs<IUserResult>();

export interface ICreateUserParams {
    username: string;
    password: string;
    role: string;
}

export interface ILoginUserParams {
  username: string;
  password: string;
}

export interface IUserResult {
  username: string;
  role: string;
}

export const User = dbClient().define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );