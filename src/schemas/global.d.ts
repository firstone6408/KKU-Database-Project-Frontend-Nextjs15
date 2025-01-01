/** @format */

import { UserRole, UserStatus } from "@/configs/enum.config";
import { DefaultUser, Session, User } from "next-auth";

declare module "next-auth" {
  interface Session
  {
    user: {
      id: string;
      role: UserRole;
      name: string;
      email: string;
      image?: string;
      branchId?: string;
      status: UserStatus;
      token: string;
    };
  }

  interface User extends DefaultUser
  {
    id: string;
    role: UserRole;
    status: UserStatus;
    branchId?: string;
    token: string;
  }
}
