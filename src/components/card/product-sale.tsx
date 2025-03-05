/** @format */

import { StockProductType } from "@/server-actions/stock";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { saleUtils } from "@/utils/sale.util";
import SelectProductDialog from "../dialog/sale/select-product";
import { productUtils } from "@/utils/product.utils";

type ProductSaleCardProp = {
  product: StockProductType;
  className?: string;
  orderId: string;
  userId: string;
};

export default function ProductSaleCard({
  product,
  className,
  orderId,
  userId,
}: ProductSaleCardProp) {
  return (
    <SelectProductDialog
      product={product}
      orderId={orderId}
      userId={userId}
      btn={
        <Card
          className={`${className} border-2 hover:border-green-400 transition-all overflow-hidden hover:cursor-pointer`}
        >
          <CardContent className="p-0">
            <Image
              className="object-cover w-full h-60 transition-transform duration-300 hover:scale-110"
              src={urlConfig.showImage(product.image)}
              width={100}
              height={100}
              alt={`Image: ${product.productCode}`}
            />
          </CardContent>
          <CardHeader className="text-center space-y-2">
            <CardDescription>{product.category.name}</CardDescription>
            <CardTitle>
              {productUtils.productNameFormatter({
                categoryName: product.category.name,
                name: product.name,
                model: product.model,
                size: product.size,
              })}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <p>คงเหลือ: {product.Stock[0].quantity}</p>
            <p className="space-x-1 text-orange-600 font-semibold">
              <span>ราคา</span>
              <span>
                {product.ProductSaleBranch[0].sellPrice.toLocaleString()}
              </span>
              <span>บาท</span>
            </p>
          </CardFooter>
        </Card>
      }
    />
  );
}
