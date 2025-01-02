/** @format */

"use client";

import { FormInputType } from "@/schemas/component/form";
import FormSelect from "../form/form-select";
import { CategoryType, fetchCategories } from "@/server-actions/category";
import { useState, useEffect } from "react";

export default function CategoryDropDown({
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
}: FormInputType) {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //console.log(isLoading);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const results = await fetchCategories();
      setCategories(results);
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
      items={categories || []}
      setKeyValue={(item) => ({
        key: item.id,
        value: item.id,
        label: item.name,
      })}
    />
  );
}
