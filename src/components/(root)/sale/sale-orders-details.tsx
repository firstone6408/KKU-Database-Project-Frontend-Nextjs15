/** @format */

"use client";

import { useEffect, useState } from "react";
import OrderSaleCard from "@/components/card/order-sale";
import OrderStatusDropdown from "@/components/dropdown/order";
import { PaymentMethodDropdown } from "@/components/dropdown/payment";
import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormFile from "@/components/form/form-file";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import { CustomerType } from "@/server-actions/customer";
import { orderConfirmAction } from "@/server-actions/order";
import { storeUtils } from "@/utils/store.utils";
import useOrderStore from "@/stores/order.store";

type SaleOrdersListProps = {
  customer: CustomerType;
  orderId: string;
  userId: string;
};

export default function SaleOrderDetails({
  customer,
  orderId,
  userId,
}: SaleOrdersListProps) {
  const orderData = storeUtils.getUserListByOwner({ orderId, userId });
  const updateOrderListDetailsByOrderId = useOrderStore(
    (state) => state.updateOrderListDetailsByOrderId
  );

  const [formData, setFormData] = useState({
    paymentMethodId: orderData?.paymentMethodId ?? "",
    amountReceived: orderData?.amountReceived ?? 0,
    change: orderData?.change ?? 0,
    slipImage: orderData?.slipImage ?? undefined,
    credit: orderData?.credit ?? 0,
    deposit: orderData?.deposit ?? 0,
    discount: orderData?.discount ?? 0,
    note: orderData?.note ?? "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(formData);
      updateOrderListDetailsByOrderId({ userId, orderId }, formData);
    }, 1000); // อัปเดตทุกๆ 3 วินาที

    return () => clearInterval(interval); // clear เมื่อ component unmount
  }, [formData, orderId, userId, updateOrderListDetailsByOrderId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value, // แปลงเป็นตัวเลขถ้าเป็น input type number
    }));

    console.log(name, value);
  };

  const calculateTotalPrice = () => {
    if (!orderData) return 0;

    // ใช้ reduce ในการคำนวณ total price
    let totalPrice: number = orderData.orderItems.reduce(
      (accumulator, item) => {
        // สมมุติว่าแต่ละ item มี property `sellPrice` และ `quantity`
        return accumulator + item.sellPrice * item.quantity;
      },
      0
    );

    if (orderData.deposit) totalPrice -= orderData.deposit;
    if (orderData.discount) totalPrice -= orderData.discount;
    if (orderData.change) totalPrice -= orderData.change;

    return totalPrice;
  };

  return (
    <div className="space-y-5 p-1">
      {/* Customer Details */}
      <h2 className="font-semibold">ลูกค้า</h2>
      <FormInput label="ชื่อ" defaultValue={customer.name} disabled />
      <div className="grid grid-cols-2 gap-2">
        <FormInput
          label="กลุ่มลูกค้า"
          defaultValue={customer.customerGroup?.name}
          disabled
        />
        <FormInput
          label="เบอร์"
          defaultValue={customer.phoneNumber}
          disabled
        />
      </div>
      <FormTextArea
        label="ที่อยู่"
        defaultValue={customer.address}
        rows={4}
        disabled
      />
      {/* End Customer Details */}

      <hr className="border" />

      {orderData ? (
        <>
          {/* Order list */}
          <div>
            <h2 className="font-semibold">รายการ</h2>
            {orderData.orderItems.length > 0 ? (
              orderData.orderItems.map((item, index) => {
                return (
                  <div key={index}>
                    <OrderSaleCard
                      orderItem={item}
                      userId={userId}
                      orderId={orderId}
                      quantity={item.quantity}
                      sellPrice={item.sellPrice}
                    />
                  </div>
                );
              })
            ) : (
              <p className="p-5 text-center">** ไม่มีรายการสินค้า **</p>
            )}
          </div>
          {/* End Order list */}

          <hr className="border" />

          {/* status */}
          <div>
            <h2 className="font-semibold">รายละเอียด</h2>
            <FormContainer
              action={orderConfirmAction}
              className="space-y-2"
            >
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
              <OrderStatusDropdown
                name="orderStatus"
                label="สถานะบิล"
                defaultValue={orderData.orderStatus}
                required
              />
              <FormInput
                value={formData.amountReceived}
                onChange={handleChange}
                name="amountReceived"
                type="number"
                label="จำนวนเงินรวม"
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
                label="เครดิต"
                onWheel={(event) => event.target.blur()}
              />
              <FormInput
                value={formData.discount}
                onChange={handleChange}
                name="discount"
                type="number"
                label="ส่วนลด"
                onWheel={(event) => event.target.blur()}
              />
              <PaymentMethodDropdown
                name="paymentMethodId"
                label="การจ่ายเงิน"
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
              <FormInput
                label="ยอดคงเหลือ"
                defaultValue={calculateTotalPrice()}
                disabled
              />
              <FormButton className="w-full" btnText={<>บันทึก</>} />
            </FormContainer>
          </div>
          {/* end status */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
