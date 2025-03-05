/** @format */

"use client";

import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { UserStatus } from "@/configs/enum.config";
import { userUtils } from "@/utils/user.utils";

export default function UserStatusDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const userStatus = Object.values(UserStatus);

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
      items={userStatus}
      setKeyValue={(item) => ({
        key: item,
        value: item,
        label: userUtils.userStatusFormatter(item),
      })}
    />
  );
}
