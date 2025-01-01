/** @format */

import { FormInputType } from "@/schemas/component/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function FormTextArea({
  name,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  rows,
}: FormInputType & { rows?: number }) {
  return (
    <div className={`${className ?? "space-y-2"}`}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows ?? 2}
      />
    </div>
  );
}
