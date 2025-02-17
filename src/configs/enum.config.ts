/** @format */

export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
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

export enum OrderStatus {
  PENDING = "PENDING", // รอดำเนินการ
  COMPLETED = "COMPLETED", // สำเร็จ
  DEPOSITED = "DEPOSITED", // จ่ายมัดจำแล้ว แต่ยังไม่จ่ายครบ
  CANCELLED = "CANCELLED", // ยกเลิก
  REFUNDED = "REFUNDED", // คืนของ
  CREDIT_USED = "CREDIT_USED", // ใช้เครดิตในการชำระเงิน (เครดิตของร้านหรือยอดค้าง)
}

export enum ProductUnit {
  METER = "METER",
  PIECE = "PIECE",
}

export enum DeliveryType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export enum DeliveryStatus {
  PENDING = "PENDING", // รอดำเนินการจัดส่ง (ยังไม่เริ่มจัดส่ง)
  IN_TRANSIT = "IN_TRANSIT", // อยู่ระหว่างการจัดส่ง (กำลังเดินทาง)
  DELIVERED = "DELIVERED", // ส่งถึงลูกค้าแล้ว
  CANCELED = "CANCELED", // ยกเลิกการจัดส่ง
  DELAYED = "DELAYED", // การจัดส่งล่าช้า
}
