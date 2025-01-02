/** @format */

import { Label } from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";

export default function FormCheckbox({
  name,
  label,
  required,
  className,
  disabled,
  defaultChecked,
  value,
}: {
  name?: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  defaultChecked: boolean;
  value?: any;
}) {
  return (
    <div className={`${className ?? "flex flex-col gap-2"}`}>
      <Label htmlFor={name}>{label}</Label>
      <Checkbox
        id={name}
        required={required}
        disabled={disabled}
        defaultChecked={defaultChecked}
        value={value}
        onCheckedChange={(checked) => {
          // Sync the value with a hidden input
          const hiddenInput = document.querySelector<HTMLInputElement>(
            `input[name="${name}"]`
          );
          if (hiddenInput) {
            hiddenInput.value = checked ? "true" : "false";
          }
        }}
      />
      <input
        type="hidden"
        name={name}
        value={defaultChecked ? "true" : "false"}
      />
    </div>
  );
}
