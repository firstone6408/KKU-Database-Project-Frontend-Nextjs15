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
import { StockProductType } from "@/server-actions/stock";

export function StockDetailsDialog(props: {
  stockProduct: StockProductType;
  btn: React.JSX.Element;
}) {
  const { btn, stockProduct: product } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-lg">
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
              defaultValue={product.productCode}
              disabled
            />
            <FormInput
              label="หมวดหมู่"
              defaultValue={product.category.name}
              disabled
            />
            <FormInput
              label="Barcode"
              name="barcode"
              defaultValue={product.barcode}
              disabled
              className="col-span-full"
            />
            <FormInput
              label="ชื่อ"
              name="name"
              defaultValue={product.name}
              disabled
              className="col-span-full"
            />
            <FormInput
              label="รุ่น"
              name="model"
              defaultValue={product.model}
              disabled
              className="col-span-full"
            />
            <FormInput
              label="ขนาด"
              name="size"
              defaultValue={product.size}
              disabled
              className="col-span-1"
            />
            <FormInput
              label="หน่วย"
              name="unit"
              defaultValue={product.unit === "METER" ? "เมตร" : "ชิ้น"}
              disabled
              className="col-span-1"
            />
            <FormTextArea
              label="คำอธิบาย"
              name="description"
              defaultValue={product.description}
              disabled
              className="col-span-full"
              rows={5}
            />
            <FormImage
              label="รูปปสินค้า"
              src={urlConfig.showImage(product.image)}
              weight={120}
              height={120}
              alt={product.name}
              className="row-span-2 flex flex-col items-center gap-2"
            />
            <FormInput
              label="ราคาขาย (บาท)"
              defaultValue={
                product.ProductSaleBranch.length > 0
                  ? product.ProductSaleBranch[0].sellPrice
                  : "ยังไม่ได้กำหนดราคา"
              }
              disabled
            />
            <FormInput
              label="จำนวนคงเหลือ"
              defaultValue={
                product.Stock.length > 0
                  ? product.Stock[0].quantity
                  : "ไม่มีสินค้า"
              }
              disabled
            />
            <FormInput
              label="วันที่สร้าง"
              defaultValue={
                product.Stock.length > 0
                  ? dayjsUtils.autoFormat(product.Stock[0].createdAt)
                  : "ยังไม่ได้เพิ่มเข้าระบบ"
              }
              disabled
            />
            <FormInput
              label="แก้ไขล่าสุด"
              defaultValue={
                product.Stock.length > 0
                  ? dayjsUtils.autoFormat(product.Stock[0].updatedAt)
                  : "ยังไม่ได้แก้ไข"
              }
              disabled
            />
          </div>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
