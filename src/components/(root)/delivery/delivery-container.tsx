/** @format */

import { DeliveryPageSearchParams } from "@/app/(root)/delivery/page";
import DeliveryListTable from "@/components/table/delivery-list-table";
import {
  fetchDeliveries,
  fetchDriversAvailable,
} from "@/server-actions/delivery";
import { getSession } from "@/utils/session.utils";
import DeliverySearch from "./delivery-search";

type DeliveryContainerProps = {
  searchParams: DeliveryPageSearchParams;
};

export default async function DeliveryContainer({
  searchParams,
}: DeliveryContainerProps) {
  const deliveries = await fetchDeliveries({ searchParams });
  const driversAvailable = await fetchDriversAvailable();
  const session = await getSession();

  // console.log("driversAvailable:", driversAvailable);

  return (
    <div className="space-y-2">
      <DeliverySearch session={session} />
      <DeliveryListTable
        deliveries={deliveries}
        driversAvailable={driversAvailable}
        session={session}
      />
    </div>
  );
}
