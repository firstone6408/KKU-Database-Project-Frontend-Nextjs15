import { StockInType, StockOutType } from "@/configs/enum.config";
import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const CategorySchema = z.object({
    id: z.string().uuid(),
    categoryCode: z.string(),
    name: z.string(),
});

export const StockSchema = z.object({
    id: z.string().uuid(),
    quantity: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});


export const ProductSchema = z.object({
    id: z.string().uuid(),
    productCode: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    isDeleted: z.boolean(),
    deletedAt: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    categoryId: z.string().uuid(),
    category: CategorySchema,
});


export const StockItem = z.object({
    sellPrice: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    product: ProductSchema.extend({ Stock: z.array(StockSchema) }),
});

export const fetchStocksResSchema = templateResponse(z.array(StockItem));


export const fetchStockOutHistoriesResSchema = templateResponse(z.array(z.object(
    {
        id: z.string().uuid(),
        quantity: z.number(),
        createdAt: z.string().datetime(),
        type: z.nativeEnum(StockOutType),
        note: z.string().nullable(),
        stockId: z.string().uuid(),
        stock: StockSchema.extend(
            {
                product: ProductSchema
            }
        )
    }
)));

const UserSchema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
});

export const fetchStockInHistoriesResSchema = templateResponse(z.array(z.object({
    id: z.string().uuid(),
    refCode: z.string(),
    costPrice: z.number(),
    quantity: z.number(),
    type: z.nativeEnum(StockInType), // สามารถเพิ่ม type ได้ตามที่ใช้
    note: z.string().nullable(),
    createdAt: z.string().datetime(),
    stockId: z.string().uuid(),
    userId: z.string().uuid(),
    stock: StockSchema.extend({ product: ProductSchema }),
    user: UserSchema,
})));