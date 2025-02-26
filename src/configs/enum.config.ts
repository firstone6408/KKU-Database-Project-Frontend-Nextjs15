/** @format */

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
  TRANSPORTER = "TRANSPORTER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum StockInType {
  RETURN = "RETURN", // การคืนสินค้า
  ORDER = "ORDER", // การสั่งซื้อ
  OTHER = "OTHER", // อื่นๆ
}

export enum StockOutType {
  SALE = "SALE",
}

export enum OrderStatusType {
  PENDING = "PENDING", // รอดำเนินการ
  COMPLETED = "COMPLETED", // สำเร็จ
  CANCELLED = "CANCELLED", // ยกเลิก
  REFUNDED = "REFUNDED", // คืนของ
  DELIVERING = "DELIVERING", // การจัดส่งกำลังดำเนินการ
  UNPAID = "UNPAID", // ค้างชำระ
}

export enum OrderTypeType {
  FULL_PAYMENT = "FULL_PAYMENT", // จ่ายเต็มจำนวน ไม่มีมัดจำ ไม่มีเครดิต
  DEPOSITED = "DEPOSITED", // จ่ายมัดจำแล้ว แต่ยังไม่จ่ายครบ
  CREDIT_USED = "CREDIT_USED", // ใช้เครดิตในการชำระเงิน (เครดิตของร้านหรือยอดค้าง)
  DEPOSITED_CREDIT_USED = "DEPOSITED_CREDIT_USED", // จ่ายมัดจำ+ใช้เครดิต
}

export enum ProductUnitType {
  METER = "METER",
  PIECE = "PIECE",
}

export enum DeliveryType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export enum DeliveryStatusType {
  PENDING = "PENDING", // รอดำเนินการจัดส่ง (ยังไม่เริ่มจัดส่ง)
  IN_TRANSIT = "IN_TRANSIT", // อยู่ระหว่างการจัดส่ง (กำลังเดินทาง)
  DELIVERED = "DELIVERED", // ส่งถึงลูกค้าแล้ว
  CANCELED = "CANCELED", // ยกเลิกการจัดส่ง
  DELAYED = "DELAYED", // การจัดส่งล่าช้า
}

// export enum PaymentType {
//   FULL = "FULL",
//   DEPOSIT = "DEPOSIT",
//   CREDIT = "CREDIT",
// }
