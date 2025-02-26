/** @format */

"use client";

import { useEffect, useState } from "react";
import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import {
  fetchPaymentMethods,
  PaymentMethodType,
} from "@/server-actions/payment-method";
// import { PaymentType } from "@/configs/enum.config";
import { paymentUtils } from "@/utils/payment.utils";

export function PaymentMethodDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  setOnChangeForm,
}: FormInputType & {
  setOnChangeForm?: (event: any) => void;
}) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchPaymentMethods();
      // console.log(result);
      setPaymentMethod(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>รอสักครู่...</p>
      </div>
    );
  }

  return (
    <FormSelect
      name={name}
      type={type}
      label={label}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      className={className}
      disabled={disabled}
      items={paymentMethod || []}
      setKeyValue={(item) => ({
        key: item.id,
        value: item.id,
        label: item.name,
      })}
      onChange={(selectedValue) => {
        if (setOnChangeForm) {
          setOnChangeForm((prev) => ({
            ...prev,
            [name]: selectedValue,
          }));
        }
      }}
    />
  );
}

// export function PaymentTypeDropdown({
//   name,
//   type,
//   label,
//   defaultValue,
//   placeholder,
//   required,
//   className,
//   disabled,
//   setPaymentType,
// }: FormInputType & {
//   setPaymentType?: (paymentType: PaymentType) => void;
// }) {
//   const paymentType = Object.values(PaymentType);

//   return (
//     <FormSelect
//       name={name}
//       type={type}
//       label={label}
//       defaultValue={defaultValue}
//       placeholder={placeholder}
//       required={required}
//       className={className}
//       disabled={disabled}
//       items={paymentType || []}
//       setKeyValue={(item) => ({
//         key: item,
//         value: item,
//         label: `${paymentUtils.paymentTypeFormatter(item)}`,
//       })}
//       onChange={(selectedValue) => {
//         if (setPaymentType) {
//           setPaymentType(selectedValue as PaymentType);
//         }
//       }}
//     />
//   );
// }
