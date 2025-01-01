/** @format */

import { FormFileType, FormInputType } from "@/schemas/component/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function FormFile({
  className,
  name,
  label,
  required,
  disabled,
  accept,
}: FormFileType) {
  return (
    <div className={`${className ?? "space-y-2"}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        name={name}
        required={required}
        disabled={disabled}
        accept={accept}
      />
    </div>
  );
}
