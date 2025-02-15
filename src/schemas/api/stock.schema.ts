/** @format */

import { ProductUnit, StockInType } from "@/configs/enum.config";
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
  barcode: z.string(),
  productCode: z.string(),
  name: z.string(),
  model: z.string(),
  size: z.string(),
  unit: z.nativeEnum(ProductUnit),
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

const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  name: z.string(),
});

const stockInItems = z.object({
  stockInHistoryId: z.string().uuid(),
  productId: z.string().uuid(),
  stockId: z.string().uuid(),
  costPrice: z.number(),
  quantity: z.number(),
  product: ProductSchema,
});

export const fetchStockInHistoriesResSchema = templateResponse(
  z.array(
    z.object({
      id: z.string().uuid(),
      refCode: z.string(),
      distributor: z.string(),
      totalPrice: z.number(),
      type: z.nativeEnum(StockInType),
      note: z.string().nullable(),
      createdAt: z.string().datetime(),
      userId: z.string().uuid(),
      branchId: z.string().uuid(),
      user: UserSchema,
      StockInItem: z.array(stockInItems),
    })
  )
);
