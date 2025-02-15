/** @format */

"use client";

import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import StockAddTable from "@/components/table/stock-add-table";
import { addStock } from "@/server-actions/stock";
import { Check } from "lucide-react";
import { useState } from "react";

export default function StockAddContainer() {
  const [stockInItems, setStockInItems] = useState<StockItemType[]>([]);

  return (
    <>
      <h1 className="py-5 font-extrabold text-xl text-center">
        เพิ่มสินค้าเข้า Stock
      </h1>
      <FormContainer action={addStock}>
        <div className="grid grid-cols-2 gap-2">
          <input type="hidden" name="pathname" defaultValue={"/stock"} />
          <input
            type="hidden"
            name="stockInItems"
            defaultValue={JSON.stringify(stockInItems)}
          />
          <FormInput
            label="รหัสนำเข้า"
            name="refCode"
            type="text"
            required
          />
          <FormInput
            label="ผู้จัดจำหน่าย"
            name="distributor"
            type="text"
            required
          />
          <FormTextArea
            className="col-span-full"
            rows={4}
            label="รายละเอียด"
            name="note"
          />
          <div className="col-span-full">
            <h2 className="py-3 mt-4 text-lg font-extrabold">
              รายการสินค้าที่นำเข้า
            </h2>
            <StockAddTable
              stockInItems={stockInItems}
              setStockInItems={setStockInItems}
            />
          </div>
          <div className="col-span-full flex justify-end">
            <FormButton
              className="bg-green-700 hover:bg-green-600"
              size={"lg"}
              btnText={
                <span className="flex items-center gap-2">
                  <Check /> บันทึก
                </span>
              }
            />
          </div>
        </div>
      </FormContainer>
    </>
  );
}
