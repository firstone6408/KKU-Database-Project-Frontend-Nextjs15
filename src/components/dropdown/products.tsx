/** @format */

"use client";

import { fetchProducts, ProductType } from "@/server-actions/product";
import { useEffect, useState } from "react";
import FormSelect from "../form/form-select";
import { FormInputType } from "@/schemas/component/form";
import { saleUtils } from "@/utils/sale.util";
import { productUtils } from "@/utils/product.utils";

export default function ProductsDropdown({
  valuesProducts,
  name,
  type,
  label,
  defaultValue,
  placeholder,
  required,
  className,
  disabled,
  onChange,
}: FormInputType & {
  onChange?: (id: number) => void;
  valuesProducts?: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (valuesProducts) {
      setProducts(valuesProducts);
    } else {
      fetchData();
    }
  }, [valuesProducts]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchProducts();
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
      value={defaultValue}
      placeholder={placeholder}
      required={required}
      className={className}
      disabled={disabled}
      items={products || []}
      setKeyValue={(item) => ({
        key: item.id,
        value: item.id,
        label: productUtils.productNameFormatter(
          {
            categoryName: item.category.name,
            name: item.name,
            model: item.model,
            size: item.size,
            unit: item.unit,
          },
          { isDash: true }
        ),
      })}
      onChange={(id) => onChange?.(id)}
    />
  );
}
