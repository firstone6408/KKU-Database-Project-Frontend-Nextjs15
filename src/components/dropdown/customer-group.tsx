/** @format */

"use client";

import {
  CustomerGroupType,
  fetchCustomerGroups,
} from "@/server-actions/customer";
import { useEffect, useState } from "react";
import { FormInputType } from "@/schemas/component/form";
import FormSelect from "../form/form-select";

export default function CustomerGroupsDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const [customerGroups, setCustomerGroups] =
    useState<CustomerGroupType[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //console.log(isLoading);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const results = await fetchCustomerGroups();
      setCustomerGroups(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>รอสักครู่...</p>
      </div>
    );
  }

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
      items={customerGroups || []}
      setKeyValue={(item) => ({
        key: item.id,
        value: item.id,
        label: item.name,
      })}
    />
  );
}
