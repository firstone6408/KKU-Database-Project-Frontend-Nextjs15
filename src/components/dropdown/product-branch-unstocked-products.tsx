/** @format */

"use client";

import {
  fetchUnstockedProductsByBranch,
  ProductType,
} from "@/server-actions/product";
import { useEffect, useState } from "react";
import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";

export default function UnstockedProductsDropdown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const [products, setProducts] = useState<ProductType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchUnstockedProductsByBranch();
      setProducts(result);
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
      items={products || []}
      setKeyValue={(item) => ({
        key: item.id,
        value: item.id,
        label: `${item.productCode} | ${item.name}`,
      })}
    />
  );
}
