/** @format */

import { UserRole, UserStatus } from "@/configs/enum.config";

export const userUtils = {
  userRoleFormatter: function (userRole?: UserRole, lang = "th") {
    if (!userRole) {
      return "-- ไม่มี --";
    }

    switch (userRole) {
      case UserRole.ADMIN:
        return "";
      case UserRole.MANAGER:
        return "ผู้จัดการ";
      case UserRole.STAFF:
        return "คนขาย";
      case UserRole.TRANSPORTER:
        return "ขนส่ง";
      default:
        return "-- ไม่มี --";
    }
  },

  userStatusFormatter: function (userStatus?: UserStatus, lang = "th") {
    if (!userStatus) {
      return "-- ไม่มี --";
    }

    switch (userStatus) {
      case UserStatus.ACTIVE:
        return "ปกติ";
      case UserStatus.INACTIVE:
        return "ไม่ใช้งาน";
      case UserStatus.SUSPENDED:
        return "ถูกระงับ";
      default:
        return "-- ไม่มี --";
    }
  },
};
