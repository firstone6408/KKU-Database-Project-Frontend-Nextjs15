/** @format */

"use client";

import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { DeliveryType, OrderTypeType } from "@/configs/enum.config";
import { deliveryUtils } from "@/utils/delivery.utils";

export default function DeliveryTypeDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  setDeliveryType,
  setOnChangeForm,
}: FormInputType & {
  setDeliveryType?: (deliveryType: DeliveryType) => void;
  setOnChangeForm?: (event: any) => void;
}) {
  const deliveryType = Object.values(DeliveryType);

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
      items={deliveryType}
      setKeyValue={(item) => ({
        key: item,
        value: item,
        label: `${deliveryUtils.deliveryTypeFormatter(item)}`,
      })}
      onChange={(selectedValue) => {
        if (setDeliveryType) {
          setDeliveryType(selectedValue as DeliveryType);
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
