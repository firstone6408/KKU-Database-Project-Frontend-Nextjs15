/** @format */

import { OrderListType } from "@/stores/order.store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import { saleUtils } from "@/utils/sale.util";
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";
import { RemoveOrderStore } from "../button/order-store";
import SelectProductDialog from "../dialog/sale/select-product";
import { productUtils } from "@/utils/product.utils";
import { ProductUnitType } from "@/configs/enum.config";

type OrderSaleCardProps = {
  orderItem: OrderListType["orderItems"][number];
  userId: string;
  orderId: string;
  quantity: number;
  sellPrice: number;
  length?: number;
};

export default function OrderSaleCard({
  orderItem,
  orderId,
  userId,
  quantity,
  sellPrice,
  length,
}: OrderSaleCardProps) {
  const price =
    orderItem.product.unit === ProductUnitType.METER
      ? sellPrice * (quantity * (length ?? 0))
      : sellPrice * quantity;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{orderItem.product.name}</CardTitle>
          <div className="space-x-2">
            <SelectProductDialog
              product={orderItem.product}
              orderId={orderId}
              userId={userId}
              quantity={quantity}
              sellPrice={sellPrice}
              length={length}
              btn={
                <Button size={"icon"}>
                  <Pen />
                </Button>
              }
            />
            <RemoveOrderStore
              productId={orderItem.productId}
              orderId={orderId}
              userId={userId}
              btn={<Trash2 />}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 items-center gap-2">
          <div className="col-span-1">
            <Image
              className="object-cover w-14 h-14 rounded-lg"
              src={urlConfig.showImage(orderItem.product.image)}
              width={100}
              height={100}
              alt={`Image: ${orderItem.product.productCode}`}
            />
          </div>
          <div className="col-span-4 flex flex-col">
            <div className="grid grid-cols-2">
              {orderItem.product.unit === ProductUnitType.METER && (
                <>
                  <p className="justify-self-start">จำนวนเมตร:</p>
                  <p className="justify-self-end">
                    {orderItem.length?.toLocaleString()}
                  </p>
                </>
              )}
              <p className="justify-self-start">จำนวน:</p>
              <p className="justify-self-end">
                {orderItem.quantity.toLocaleString()}
              </p>

              <p className="justify-self-start">ราคาขาย:</p>
              <p className="justify-self-end">
                {orderItem.sellPrice.toLocaleString()} บาท
              </p>

              <p className="justify-self-start font-semibold">ราคารวม:</p>
              <p className="justify-self-end font-semibold">
                {price.toLocaleString()} บาท
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
