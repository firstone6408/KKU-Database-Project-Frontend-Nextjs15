/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../../form/form-container";
import { updateProduct } from "@/server-actions/product";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import { dayjsUtils } from "@/utils/date.utils";
import { urlConfig } from "@/configs/url.config";
import FormImage from "@/components/form/form-image";
import { StockType } from "@/server-actions/stock";

export function StockDetailsDialog(props: {
  stock: StockType;
  btn: React.JSX.Element;
}) {
  const { btn, stock } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>รายละเอียด Stock</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateProduct} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormInput
              label="รหัส"
              name="productCode"
              defaultValue={stock.product.productCode}
              disabled
            />
            <FormInput
              label="หมวดหมู่"
              defaultValue={stock.product.category.name}
              disabled
            />
            <FormInput
              label="ชื่อ"
              name="name"
              defaultValue={stock.product.name}
              disabled
              className="col-span-full"
            />
            <FormTextArea
              label="คำอธิบาย"
              name="description"
              defaultValue={stock.product.description}
              disabled
              className="col-span-full"
              rows={5}
            />
            <FormImage
              label="รูปปสินค้า"
              src={urlConfig.showImage(stock.product.image)}
              weight={120}
              height={120}
              alt={stock.product.name}
              className="row-span-2 flex flex-col items-center gap-2"
            />
            <FormInput
              label="ราคาขาย (บาท)"
              defaultValue={stock.sellPrice}
              disabled
            />
            <FormInput
              label="จำนวนคงเหลือ"
              defaultValue={stock.product.Stock[0].quantity}
              disabled
            />
            <FormInput
              label="วันที่สร้าง"
              defaultValue={dayjsUtils.autoFormat(stock.createdAt)}
              disabled
            />
            <FormInput
              label="แก้ไขล่าสุด"
              defaultValue={dayjsUtils.autoFormat(stock.updatedAt)}
              disabled
            />
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
