/** @format */

"use client";

import useOrderStore from "@/stores/order.store";
import { Button } from "../ui/button";

type RemoveOrderStoreProps = {
  btn: any;
  productId: string;
  userId: string;
  orderId: string;
};

export function RemoveOrderStore({
  btn,
  productId,
  userId,
  orderId,
}: RemoveOrderStoreProps) {
  const removeOrderItemByProductId = useOrderStore(
    (state) => state.removeOrderItemByProductId
  );
  return (
    <Button
      variant={"destructive"}
      size={"icon"}
      onClick={() =>
        removeOrderItemByProductId({ userId, orderId }, productId)
      }
    >
      {btn}
    </Button>
  );
}
