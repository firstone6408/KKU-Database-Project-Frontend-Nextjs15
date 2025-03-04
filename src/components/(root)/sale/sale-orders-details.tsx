/** @format */

"use client";

import { useEffect, useState } from "react";
import OrderSaleCard from "@/components/card/order-sale";
import FormButton from "@/components/form/form-button";
import FormContainer from "@/components/form/form-container";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import { CustomerType } from "@/server-actions/customer";
import { orderConfirmAction } from "@/server-actions/order";
import { storeUtils } from "@/utils/store.utils";
import useOrderStore from "@/stores/order.store";
import { SaleOrdersDetailsForm } from "@/components/form/sale/sale-orders-details";
import OrderTypeDropdown from "@/components/dropdown/order";
import { OrderTypeType } from "@/configs/enum.config";
import { DeliveryCreateDialog } from "@/components/dialog/delivery/delivery-create";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

type SaleOrdersListProps = {
  customer: CustomerType;
  order: {
    orderId: string;
    orderCode: string;
  };
  userId: string;
};

export type SaleOrderDetailsFormDataType = {
  paymentMethodId: string;
  amountRecevied: number;
  change: number;
  slipImage: File | undefined;
  credit: number;
  deposit: number;
  discount: number;
  note: string;
  orderType: OrderTypeType;
};

export default function SaleOrderDetails({
  customer,
  order,
  userId,
}: SaleOrdersListProps) {
  const { orderId, orderCode } = order;

  const orderData = storeUtils.getUserListByOwner({ orderId, userId });
  const updateOrderListDetailsByOrderId = useOrderStore(
    (state) => state.updateOrderListDetailsByOrderId
  );
  const [orderType, setOrderType] = useState<OrderTypeType>(
    orderData?.orderType ?? OrderTypeType.FULL_PAYMENT
  );

  const [formData, setFormData] = useState<SaleOrderDetailsFormDataType>({
    paymentMethodId: orderData?.paymentMethodId ?? "",
    amountRecevied: orderData?.amountRecevied ?? 0,
    change: orderData?.change ?? 0,
    slipImage: orderData?.slipImage ?? undefined,
    credit: orderData?.credit ?? 0,
    deposit: orderData?.deposit ?? 0,
    discount: orderData?.discount ?? 0,
    note: orderData?.note ?? "",
    orderType: orderData?.orderType ?? OrderTypeType.FULL_PAYMENT,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(formData);
      updateOrderListDetailsByOrderId(
        { userId, orderId },
        { ...formData }
      );
    }, 1000); // อัปเดตทุกๆ 3 วินาที

    return () => clearInterval(interval); // clear เมื่อ component unmount
  }, [formData, orderId, userId, updateOrderListDetailsByOrderId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value, // แปลงเป็นตัวเลขถ้าเป็น input type number
    }));

    //console.log(name, value);
  };

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    setTotalAmount(calculateTotalPrice());
  }, [orderData]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice({ isCalculateBalance: true }));
  }, [orderData, formData]);

  const calculateTotalPrice = (params?: {
    isCalculateBalance: boolean;
  }) => {
    if (!orderData) return 0;

    let total = orderData.orderItems.reduce(
      (acc, item) => acc + item.sellPrice * item.quantity,
      0
    );

    if (params) {
      const { isCalculateBalance } = params;

      if (isCalculateBalance) {
        total -= formData.deposit ?? 0;
        total -= formData.discount ?? 0;
        total -= formData.change ?? 0;
        total -= formData.amountRecevied ?? 0;
      }
    }

    return total >= 0 ? total : 0;
  };

  return (
    <div className="space-y-5 p-1">
      {/* Customer Details */}
      <div>
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
      </div>
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
            <div className="space-y-2">
              <OrderTypeDropdown
                name="orderType"
                label="ตัวเลือกการชำระเงิน"
                setOrderType={setOrderType}
                defaultValue={
                  orderData.orderType ?? OrderTypeType.FULL_PAYMENT
                }
                setOnChangeForm={setFormData}
              />

              <FormInput
                value={totalAmount}
                type="number"
                label="จำนวนเงินทั้งหมด"
                disabled
              />

              <FormContainer
                action={orderConfirmAction}
                className="space-y-2"
              >
                <SaleOrdersDetailsForm
                  formData={formData}
                  handleChange={handleChange}
                  orderType={orderType ?? OrderTypeType.FULL_PAYMENT}
                  orderData={orderData}
                  orderId={orderId}
                  totalPrice={totalPrice}
                  setFormData={setFormData}
                />
                <FormButton className="w-full" btnText={<>บันทึก</>} />
              </FormContainer>
              <DeliveryCreateDialog
                order={{ orderId: orderId, orderCode: orderCode }}
                customer={customer}
                btn={
                  <Button className="w-full" variant={"outline"}>
                    <Car />
                    <p>ขนส่ง</p>
                  </Button>
                }
              />
            </div>
          </div>
          {/* end status */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
