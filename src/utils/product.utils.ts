/** @format */

import { ProductUnitType } from "@/configs/enum.config";

export const productUtils = {
  productNameFormatter: function (
    product: {
      categoryName?: string | null;
      name?: string | null;
      size?: string | null;
      model?: string | null;
      unit?: ProductUnitType;
    },
    options?: {
      isDash?: boolean;
    }
  ) {
    if (options) {
      if (options.isDash) {
        return `${product.categoryName} | ${product.name} | ${
          product.model
        } | ${product.size} | ${this.productUnitFormatter(product.unit)}`;
      }
    }
    return `${product.categoryName} ${product.name} ${product.model} ${
      product.size
    } ${this.productUnitFormatter(product.unit)}`;
  },

  productUnitFormatter: function (unit?: ProductUnitType) {
    if (!unit) {
      return "";
    }

    switch (unit) {
      case "METER":
        return "เมตร";
      case "PIECE":
        return "ชิ้น";
      default:
        return "";
    }
  },
};
