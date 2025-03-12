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
import { OrderTypeDropdown } from "@/components/dropdown/order";
import { OrderTypeType, ProductUnitType } from "@/configs/enum.config";
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
  const updateSomeByOrderId = useOrderStore(
    (state) => state.updateSomeByOrderId
  );
  const [orderType, setOrderType] = useState<OrderTypeType>(
    orderData?.orderType ?? OrderTypeType.FULL_PAYMENT
  );

  const [formData, setFormData] = useState<SaleOrderDetailsFormDataType>({
    paymentMethodId: "",
    amountRecevied: 0,
    change: 0,
    slipImage: undefined,
    credit: 0,
    deposit: 0,
    discount: 0,
    note: "",
    orderType: OrderTypeType.FULL_PAYMENT,
  });

  const [fee, setFee] = useState(0);

  useEffect(() => {
    updateSomeByOrderId({ userId, orderId }, { orderType: orderType });
  }, [orderType]);

  useEffect(() => {
    if (orderData) {
      setFormData({
        paymentMethodId: orderData.paymentMethodId ?? "",
        amountRecevied: orderData.amountRecevied ?? 0,
        change: orderData.change ?? 0,
        slipImage: orderData.slipImage ?? undefined,
        credit: orderData.credit ?? 0,
        deposit: orderData.deposit ?? 0,
        discount: orderData.discount ?? 0,
        note: orderData.note ?? "",
        orderType: orderData.orderType ?? OrderTypeType.FULL_PAYMENT,
      });
    }
  }, [orderData]);

  useEffect(() => {
    // ตั้งค่า timeout ที่จะทำงานหลังจาก 2 วินาที
    const timeout = setTimeout(() => {
      updateOrderListDetailsByOrderId(
        { userId, orderId },
        { ...formData }
      );
    }, 2000); // 2000ms = 2 วินาที

    // ตั้ง interval ที่จะทำงานทุกๆ 1 วินาที
    const interval = setInterval(() => {
      updateOrderListDetailsByOrderId(
        { userId, orderId },
        { ...formData }
      );
    }, 1000); // ทุกๆ 1 วินาที

    // คืนค่าฟังก์ชันที่ clear ทั้ง timeout และ interval เมื่อ component unmount
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
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
    console.log("OrderType:", orderType);
  }, [orderData, formData, orderType]);

  const calculateTotalPrice = (params?: {
    isCalculateBalance: boolean;
  }) => {
    if (!orderData) return 0;

    let total = orderData.orderItems.reduce((acc, item) => {
      if (item.product.unit === ProductUnitType.METER) {
        return acc + item.sellPrice * ((item.length ?? 0) * item.quantity);
      } else {
        return acc + item.sellPrice * item.quantity;
      }
    }, 0);

    total += fee;

    if (params) {
      const { isCalculateBalance } = params;

      if (isCalculateBalance) {
        total -= formData.discount ?? 0;
        total -= formData.change ?? 0;

        switch (orderType) {
          case OrderTypeType.FULL_PAYMENT:
            total -= formData.amountRecevied ?? 0;
            // console.log("do");
            break;
          case OrderTypeType.CREDIT_USED:
            break;
          case OrderTypeType.DEPOSITED:
          case OrderTypeType.DEPOSITED_CREDIT_USED:
            total -= formData.deposit ?? 0;
          default:
            break;
        }
      }
    }
    // console.log("formData:", formData);
    // console.log("TotoalPrice:", total);
    // console.log("orderType:", formData.orderType);

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
                  <div key={index} className="my-2">
                    <OrderSaleCard
                      orderItem={item}
                      userId={userId}
                      orderId={orderId}
                      quantity={item.quantity}
                      sellPrice={item.sellPrice}
                      length={item.length}
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
                value={totalAmount.toFixed(2)}
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
                <div className="flex gap-2">
                  <DeliveryCreateDialog
                    order={{ orderId: orderId, orderCode: orderCode }}
                    customer={customer}
                    btn={
                      <Button className="w-full" variant={"outline"}>
                        <Car />
                        <p>ขนส่ง</p>
                      </Button>
                    }
                    setFee={setFee}
                  />
                  <FormButton className="w-full" btnText={<>บันทึก</>} />
                </div>
              </FormContainer>
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
