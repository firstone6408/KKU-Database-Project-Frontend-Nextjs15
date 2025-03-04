/** @format */

import { DeliveryType } from "@/configs/enum.config";
import { z } from "zod";

export const CreateDeliveryFormData = z.object({
  orderId: z.string().uuid(),
  options: z.object({
    trackNumber: z.string(),
    distance: z.number().min(1, "ระยะทางต้องมากกว่า 0"),
    address: z.string(),
    type: z.nativeEnum(DeliveryType),
    lng: z.number().gt(0, "พิกัดลองจิจูดต้องมากกว่า 0"),
    lat: z.number().gt(0, "พิกัดละติจูดต้องมากกว่า 0"),
    note: z.string().optional(),
    sendDate: z
      .string()
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid datetime",
      })
      .transform((value) => new Date(value)), // แปลงเป็น Date
    fee: z.number().min(0, "ค่าส่งไม่สามารถติดลบได้"),
  }),
});

export type CreateDeliveryFormDataType = z.infer<
  typeof CreateDeliveryFormData
>;

export const AddDeliveryFormData = z.object({
  orderId: z.string(),
  pathname: z.string().optional(),
  userIds: z.array(z.string()),
});

export const DeliveryDoneFormDataSchema = z.object({
  orderId: z.string().uuid(),
  pathname: z.string().optional(),
  slipImage: z.instanceof(File).optional(),
});
