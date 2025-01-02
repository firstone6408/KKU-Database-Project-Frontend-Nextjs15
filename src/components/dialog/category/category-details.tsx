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
import FormInput from "../../form/form-input";
import { dayjsUtils } from "@/utils/date.utils";
import { useState } from "react";
import FormButton from "../../form/form-button";
import { usePathname } from "next/navigation";
import {
  CategoryType,
  updateCategoryAction,
} from "@/server-actions/category";
import { RemoveCategoryButton } from "@/components/button/category";

export function CategoryDetailsDialog(props: {
  btn: React.JSX.Element;
  category: CategoryType;
}) {
  const { btn, category } = props;
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState<boolean>(true);

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <div className="flex items-center gap-1">
            <DialogTitle>รายละเอียดหมวหมู่</DialogTitle>
            <DialogDescription></DialogDescription>
            <RemoveCategoryButton
              categoryId={category.id}
              btn={"ลบ"}
              name="id"
            />
          </div>
        </DialogHeader>
        {/* content */}
        <FormContainer action={updateCategoryAction} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input type="hidden" name="id" defaultValue={category.id} />
            <input type="hidden" name="pathname" defaultValue={pathname} />
            <FormInput
              label="รหัส"
              name="categoryCode"
              defaultValue={category.categoryCode}
              required
              disabled={isEdit}
            />
            <FormInput
              label="ชื่อ"
              name="name"
              defaultValue={category.name}
              required
              disabled={isEdit}
            />
            <FormInput
              label="วันที่สร้าง"
              defaultValue={dayjsUtils.autoFormat(category.createdAt)}
              disabled
            />
            <FormInput
              label="แก้ไขล่าสุด"
              defaultValue={dayjsUtils.autoFormat(category.updatedAt)}
              disabled
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => onClickEdit()}
              variant={isEdit ? "default" : "destructive"}
            >
              {isEdit ? "แก้ไข" : "ยกเลิก"}
            </Button>
            {!isEdit && <FormButton btnText="ตกลง" />}
          </DialogFooter>
        </FormContainer>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
