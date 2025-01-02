/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormContainer from "../../form/form-container";
import { usePathname } from "next/navigation";
import { ProductType, updateProduct } from "@/server-actions/product";
import FormInput from "@/components/form/form-input";
import { useState } from "react";
import CategoryDropDown from "@/components/dropdown/category";
import FormTextArea from "@/components/form/form-textarea";
import FormCheckbox from "@/components/form/form-checkbox";
import { dayjsUtils } from "@/utils/date.utils";
import FormFile from "@/components/form/form-file";
import FormButton from "@/components/form/form-button";
import Image from "next/image";
import { urlConfig } from "@/configs/url.config";
import FormImage from "@/components/form/form-image";

export function ProductDetailsDialog(props: {
  product: ProductType;
  btn: React.JSX.Element;
}) {
  const { btn, product } = props;
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState<boolean>(true);

  const onClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>รายละเอียดสินค้า</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateProduct} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="id" defaultValue={product.id} />
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput
              label="รหัส"
              name="productCode"
              defaultValue={product.productCode}
              required
              disabled={isEdit}
            />
            <CategoryDropDown
              label="หมวดหมู่"
              name="categoryId"
              defaultValue={product.category.id}
              required
              disabled={isEdit}
            />
            <FormInput
              label="ชื่อ"
              name="name"
              defaultValue={product.name}
              required
              disabled={isEdit}
              className="col-span-full"
            />
            <FormTextArea
              label="คำอธิบาย"
              name="description"
              defaultValue={product.description}
              disabled={isEdit}
              className="col-span-full"
              rows={5}
            />
            <FormImage
              label="รูปปัจจุบัน"
              src={urlConfig.showImage(product.image)}
              weight={80}
              height={80}
              alt={product.name}
            />
            <FormFile
              label="รูปภาพ"
              name="image"
              accept="image/*"
              disabled={isEdit}
            />
            <FormCheckbox
              label="สถาณะ"
              name="isDeleted"
              defaultChecked={product.isDeleted}
              disabled={isEdit}
              value={product.isDeleted}
            />
            <FormInput
              label="วันที่ลบ"
              defaultValue={
                product.deletedAt
                  ? dayjsUtils.autoFormat(product.deletedAt)
                  : "no date"
              }
              disabled
            />
            <FormInput
              label="วันที่สร้าง"
              defaultValue={dayjsUtils.autoFormat(product.createdAt)}
              disabled
            />
            <FormInput
              label="แก้ไขล่าสุด"
              defaultValue={dayjsUtils.autoFormat(product.updatedAt)}
              disabled
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => onClick()}
              variant={isEdit ? "default" : "destructive"}
            >
              {isEdit ? "แก้ไข" : "ยกเลิก"}
            </Button>
            {!isEdit && <FormButton btnText="บันทึก" />}
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
