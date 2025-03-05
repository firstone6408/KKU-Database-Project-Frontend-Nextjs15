/** @format */

"use client";

import { FormInputType } from "@/schemas/component/form";
import FormSelect from "../form/form-select";
import { UserRole } from "@/configs/enum.config";
import { userUtils } from "@/utils/user.utils";

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
  const userRolesArray = Object.values(UserRole);

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
        key: item,
        value: item,
        label: userUtils.userRoleFormatter(item),
      })}
    />
  );
}
