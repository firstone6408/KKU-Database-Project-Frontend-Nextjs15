/** @format */

import { FormInputType } from "@/schemas/component/form";
import FormSelect from "../form/form-select";
import { UserRole } from "@/configs/enum.config";

export default function UserRoleDropDown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const userRolesArray = Object.values(UserRole)
    .filter((role) => role !== UserRole.ADMIN)
    .map((role) => ({
      name: role,
    }));

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
      items={userRolesArray || []}
      setKeyValue={(item) => ({
        key: item.name,
        value: item.name,
        label: item.name,
      })}
    />
  );
}
