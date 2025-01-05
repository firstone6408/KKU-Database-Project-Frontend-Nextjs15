/** @format */

export enum UserRole
{
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export enum UserStatus
{
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}


export enum StockInType
{
  RETURN = "RETURN", // การคืนสินค้า
  ORDER = "ORDER", // การสั่งซื้อ
  OTHER = "OTHER", // อื่นๆ
}

export enum StockOutType
{
  SALE = "SALE"
}

export enum OrderStatus
{
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}
