/** @format */

"use client";

import { useEffect, useState } from "react";
import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import {
  fetchPaymentMethods,
  PaymentMethodType,
} from "@/server-actions/payment-method";

export function PaymentMethodDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
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
    />
  );
}
