/** @format */

"use client";

import { removeOrderAction } from "@/server-actions/order";
import FormContainer from "../form/form-container";
import { Button } from "../ui/button";

export function RemoveOrderButton({
  orderId,
  btn,
  name,
}: {
  orderId: string;
  btn: any;
  name: string;
}) {
  return (
    <FormContainer action={removeOrderAction}>
      <input type="hidden" id={name} name={name} defaultValue={orderId} />
      <Button variant={"destructive"} type="submit">
        {btn}
      </Button>
    </FormContainer>
  );
}
