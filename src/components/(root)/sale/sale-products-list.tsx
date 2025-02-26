/** @format */

import ProductSaleCard from "@/components/card/product-sale";
import { StockProductType } from "@/server-actions/stock";

type SaleProductsListProps = {
  stockProducts: StockProductType[];
  orderId: string;
  userId: string;
};

export default function SaleProductsList({
  orderId,
  stockProducts,
  userId,
}: SaleProductsListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stockProducts.length > 0 ? (
        stockProducts.map((product, index) => (
          <ProductSaleCard
            key={index}
            product={product}
            orderId={orderId}
            userId={userId}
          />
        ))
      ) : (
        <p>** ไม่มีสินค้า **</p>
      )}
    </div>
  );
}
