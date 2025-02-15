/** @format */

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { FormInputType } from "@/schemas/component/form";

type KeyValueProps = {
  key: any;
  value: any;
  label: any;
};

type FormSelectProps<T> = FormInputType & {
  setKeyValue: (item: T) => KeyValueProps;
  items: T[];
  onChange?: (value: any) => void;
};

export default function FormSelect<T>({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  setKeyValue,
  items,
  onChange,
}: FormSelectProps<T>) {
  return (
    <div className={`${className ? className : "space-y-2"}`}>
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <Select
        defaultValue={defaultValue}
        name={name}
        required={required}
        disabled={disabled}
        onValueChange={(value) => onChange?.(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items &&
            items.map((item) => (
              <SelectItem
                key={setKeyValue(item).key}
                value={setKeyValue(item).value}
              >
                {setKeyValue(item).label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
