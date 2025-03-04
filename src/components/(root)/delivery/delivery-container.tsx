/** @format */

import DeliveryListTable from "@/components/table/delivery-list-table";
import {
  fetchDeliveries,
  fetchDriversAvailable,
} from "@/server-actions/delivery";
import { getSession } from "@/utils/session.utils";

export default async function DeliveryContainer() {
  const deliveries = await fetchDeliveries();
  const driversAvailable = await fetchDriversAvailable();
  const session = await getSession();

  // console.log("driversAvailable:", driversAvailable);

  return (
    <DeliveryListTable
      deliveries={deliveries}
      driversAvailable={driversAvailable}
      session={session}
    />
  );
}
