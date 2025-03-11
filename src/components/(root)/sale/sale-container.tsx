/** @format */

import { fetchStockProductsAvailable } from "@/server-actions/stock";
import SaleOrderDetails from "./sale-orders-details";
import SaleProductsList from "./sale-products-list";
import SaleProductsSearch from "./sale-products-search";
import { SalePageSearchParamsType } from "@/app/(root)/bill/sale/page";
import { fetchCustomerByCustomerId } from "@/server-actions/customer";
import { getSession } from "@/utils/session.utils";

type SaleContainerProps = {
  params: SalePageSearchParamsType;
};

export default async function SaleContainer({
  params,
}: SaleContainerProps) {
  const { orderCode, customerId, orderId } = params;
  const user = (await getSession()).user;
  // console.log(params);

  const stockProducts = await fetchStockProductsAvailable();
  const customer = await fetchCustomerByCustomerId(customerId);

  //console.log(stockProducts);
  return (
    <>
      {/* <h2 className="py-3 font-bold text-xl">หน้าสำหรับการขาย</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {/* Products list */}
        <section className="col-span-4 space-y-2 p-2">
          <h2 className="font-bold text-xl py-3 text-center">
            รายการสินค้า
          </h2>
          {/* <SaleProductsSearch /> */}
          <div className="overflow-y-auto">
            <SaleProductsList
              orderId={orderId}
              stockProducts={stockProducts}
              userId={user.id}
            />
          </div>
        </section>
        {/* End Products list */}

        {/* Orders list */}
        <section className="col-span-2 p-2">
          <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg border shadow p-2">
            <h2 className="font-bold text-xl py-3 text-center">
              {`ใบสั่งซื้อ #${orderCode}`}
            </h2>
            <div className="overflow-y-auto h-[rem]">
              <SaleOrderDetails
                customer={customer}
                order={{
                  orderId: orderId,
                  orderCode: orderCode,
                }}
                userId={user.id}
              />
            </div>
          </div>
        </section>
        {/* End Orders list */}
      </div>
    </>
  );
}
