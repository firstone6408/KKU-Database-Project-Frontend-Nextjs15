/** @format */

"use client";

import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { OrderStatus } from "@/configs/enum.config";
import { orderUtils } from "@/utils/order.util";

export default function OrderStatusDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const orderStatus = Object.values(OrderStatus);

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
