/** @format */

import { FormInputType } from "@/schemas/component/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  value,
  onChange,
  onBlur,
  onWheel,
}: FormInputType) {
  return (
    <div className={`${className} space-y-2`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...(value !== undefined ? { value, onChange } : {})}
        onBlur={onBlur}
        onWheel={onWheel}
      />
    </div>
  );
}
