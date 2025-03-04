/** @format */
"use client";

import { FormInputType } from "@/schemas/component/form";
import FormSelect from "../form/form-select";

export function StockStatusDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const stockStatus = [
    { value: true, label: "ยกเลิก" },
    { value: false, label: "ปกติ" },
  ];

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
      items={stockStatus || []}
      setKeyValue={(item) => ({
        key: item.value,
        value: item.value,
        label: item.label,
      })}
    />
  );
}
