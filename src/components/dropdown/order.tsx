/** @format */

"use client";

import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { OrderStatusType, OrderTypeType } from "@/configs/enum.config";
import { orderUtils } from "@/utils/order.util";

export function OrderTypeDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  setOrderType,
  setOnChangeForm,
}: FormInputType & {
  setOrderType?: (orderType: OrderTypeType) => void;
  setOnChangeForm?: (event: any) => void;
}) {
  const orderType = Object.values(OrderTypeType);

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
      items={orderType}
      setKeyValue={(item) => ({
        key: item,
        value: item,
        label: `${orderUtils.orderTypeFormatter(item)}`,
      })}
      onChange={(selectedValue) => {
        if (setOrderType) {
          setOrderType(selectedValue as OrderTypeType);
        }
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

export function OrderStatusDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const orderStatus = Object.values(OrderStatusType);

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
      items={orderStatus}
      setKeyValue={(item) => ({
        key: item,
        value: item,
        label: `${orderUtils.orderStatusFormatter(item)}`,
      })}
    />
  );
}
