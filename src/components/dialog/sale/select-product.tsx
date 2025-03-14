/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductUnitType } from "@/configs/enum.config";
import { StockProductType } from "@/server-actions/stock";
import useOrderStore from "@/stores/order.store";
import { productUtils } from "@/utils/product.utils";
import { saleUtils } from "@/utils/sale.util";
import { useEffect, useState } from "react";

type ErrorsType = {
  quantity?: string;
  sellPrice?: string;
  length?: string;
};

export default function SelectProductDialog(props: {
  product: StockProductType;
  btn: React.JSX.Element;
  orderId: string;
  userId: string;
  quantity?: number;
  sellPrice?: number;
  length?: number;
}) {
  const {
    product,
    btn,
    userId,
    orderId,
    quantity: _quantity,
    sellPrice: _sellPrice,
    length: _length,
  } = props;
  const [quantity, setQuantity] = useState<number>(
    _quantity ? _quantity : 0
  );
  const [sellPrice, setSellPrice] = useState<number>(
    _sellPrice ? _sellPrice : product.ProductSaleBranch[0].sellPrice
  );
  const [length, setLength] = useState<number>(_length ? _length : 0);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const createOrderIfNotExist = useOrderStore(
    (state) => state.createOrderIfNotExist
  );
  const addOrderItemsByOrderId = useOrderStore(
    (state) => state.addOrderItemsByOrderId
  );

  const handleSubmit = () => {
    const newErrors: ErrorsType = {};

    if (!quantity || quantity <= 0) {
      newErrors.quantity = "กรุณากรอกจำนวนสินค้าที่มากกว่า 0";
    }
    if (quantity > product.Stock[0].quantity) {
      newErrors.quantity = "ไม่สามารถซื้อสินค้ามากกว่าจำนวนใน Stock";
    }
    if (!sellPrice || sellPrice <= 0) {
      newErrors.sellPrice = "กรุณากรอกราคาขายที่มากกว่า 0";
    }
    if (product.unit === ProductUnitType.METER) {
      const q = quantity * length;
      if (q > product.Stock[0].quantity) {
        newErrors.sellPrice = "จำนวนมตรรวมมากกว่าที่มีใน Stock";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    //console.log("✅ ส่งข้อมูลสำเร็จ!", { quantity, sellPrice });

    // console.log("userId:", userId);
    // console.log("orderId:", orderId);
    // console.log("quantity:", quantity);
    // console.log("sellPrice:", sellPrice);

    createOrderIfNotExist({ userId, orderId });
    addOrderItemsByOrderId(
      { userId, orderId },
      {
        product: product,
        sellPrice: sellPrice,
        quantity: quantity,
        productId: product.id,
        length: length,
      }
    );

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <p>
              เลือก "
              {productUtils.productNameFormatter({
                categoryName: product.category.name,
                name: product.name,
                model: product.model,
                size: product.size,
              })}
              "
            </p>
            <p>ยอดคงเหลือ: {product.Stock[0].quantity}</p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        {product.unit === ProductUnitType.METER && (
          <div>
            <Label>{`จำนวนเมตรต่อแผ่น`}</Label>
            <Input
              type="number"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
              required
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.length}</p>
            )}
          </div>
        )}
        <div>
          <Label>{`จำนวนสินค้า`}</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            required
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}
        </div>
        <div>
          <Label>ราคาขาย (บาท)</Label>
          <Input
            type="number"
            value={sellPrice}
            onChange={(event) => setSellPrice(Number(event.target.value))}
            required
          />
          {errors.sellPrice && (
            <p className="text-red-500 text-sm">{errors.sellPrice}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => handleSubmit()}>บันทึก</Button>
        </DialogFooter>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
