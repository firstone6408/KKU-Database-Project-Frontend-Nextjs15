/** @format */

"use client";

import FormInput from "../form-input";
import FormFile from "../form-file";
import FormTextArea from "../form-textarea";
import { PaymentMethodDropdown } from "@/components/dropdown/payment";
import { SaleOrderDetailsFormDataType } from "@/components/(root)/sale/sale-orders-details";
import { OrderListType } from "@/stores/order.store";
import { OrderTypeType } from "@/configs/enum.config";

type SaleOrdersDetailsFormProp = {
  orderType: OrderTypeType;
  formData: SaleOrderDetailsFormDataType;
  setFormData: (value: any) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderId: string;
  orderData: OrderListType;
  totalPrice: number;
};

export function SaleOrdersDetailsForm({
  orderType,
  handleChange,
  formData,
  orderId,
  orderData,
  totalPrice,
  setFormData,
}: SaleOrdersDetailsFormProp) {
  return (
    <>
      <input
        name="orderId"
        type="hidden"
        defaultValue={orderId}
        required
      />
      <input
        name="orderItems"
        type="hidden"
        defaultValue={JSON.stringify(orderData.orderItems)}
        required
      />
      <input
        name="orderType"
        type="hidden"
        defaultValue={orderType}
        required
      />
      {/* <OrderStatusDropdown
        name="orderStatus"
        label="สถานะบิล"
        defaultValue={orderData.orderStatus}
        required
      /> */}

      {/* Credit */}
      {orderType === OrderTypeType.CREDIT_USED && (
        <FormInput
          value={formData.credit}
          onChange={handleChange}
          name="credit"
          type="number"
          label="เครดิต (จำนวนวัน)"
          onWheel={(event) => event.target.blur()}
        />
      )}
      {/* End Credit */}

      {/* Deposit */}
      {orderType === OrderTypeType.DEPOSITED && (
        <FormInput
          value={formData.deposit}
          onChange={handleChange}
          name="deposit"
          type="number"
          label="เงินมัดจำ"
          onWheel={(event) => event.target.blur()}
        />
      )}
      {/* End Deposit */}

      {/* Deposit and Credit */}
      {orderType === OrderTypeType.DEPOSITED_CREDIT_USED && (
        <>
          <FormInput
            value={formData.deposit}
            onChange={handleChange}
            name="deposit"
            type="number"
            label="เงินมัดจำ"
            onWheel={(event) => event.target.blur()}
          />
          <FormInput
            value={formData.credit}
            onChange={handleChange}
            name="credit"
            type="number"
            label="เครดิต (จำนวนวัน)"
            onWheel={(event) => event.target.blur()}
          />
        </>
      )}
      {/* End Deposit and Credit */}

      {/* Full */}
      {orderType === OrderTypeType.FULL_PAYMENT && (
        <>
          <FormInput
            value={formData.amountRecevied}
            onChange={handleChange}
            name="amountRecevied"
            type="number"
            label="จำนวนเงินที่จ่าย"
            onWheel={(event) => event.target.blur()}
          />
          <FormInput
            value={formData.change}
            onChange={handleChange}
            name="change"
            type="number"
            label="เงินทอน"
            onWheel={(event) => event.target.blur()}
          />
        </>
      )}
      {/* End Full */}

      <FormInput
        value={formData.discount}
        onChange={handleChange}
        name="discount"
        type="number"
        label="ส่วนลด"
        onWheel={(event) => event.target.blur()}
      />

      <FormInput
        label="ยอดค้างชำระ"
        value={totalPrice.toFixed(2)}
        disabled
      />

      <PaymentMethodDropdown
        name="paymentMethodId"
        label="การจ่ายเงิน"
        setOnChangeForm={setFormData}
        defaultValue={orderData.paymentMethodId}
        required
      />

      <FormFile
        name="slipImage"
        label="หลักฐานการชำระเงิน (รูปภาพ)"
        accept="image/*"
      />
      <FormTextArea
        value={formData.note}
        onChange={handleChange}
        name="note"
        type="text"
        label="หมายเหตุ"
        rows={4}
      />
    </>
  );
}
