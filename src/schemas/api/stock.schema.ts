import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const CategorySchema = z.object({
    id: z.string().uuid(),
    categoryCode: z.string(),
    name: z.string(),
});


export const StockSchema = z.array(
    z.object({
        id: z.string().uuid(),
        quantity: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
    })
);

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
    Stock: StockSchema
});


export const DataItemSchema = z.object({
    sellPrice: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    product: ProductSchema,
});

export const fetchStocksResSchema = templateResponse(z.array(DataItemSchema));