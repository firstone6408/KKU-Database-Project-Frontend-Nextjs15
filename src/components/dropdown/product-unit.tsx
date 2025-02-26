/** @format */

"use client";

import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { ProductUnitType } from "@/configs/enum.config";

export default function ProductUnitDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const productUnit = Object.values(ProductUnitType);

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
      items={productUnit}
      setKeyValue={(item) => ({
        key: item,
        value: item,
        label: `${item === "METER" ? "เมตร" : "ชิ้น"}`,
      })}
    />
  );
}
