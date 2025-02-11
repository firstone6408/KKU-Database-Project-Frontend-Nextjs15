/** @format */

import FormContainer from "../form/form-container";
import { Button } from "../ui/button";
import { removePaymentMethodAction } from "@/server-actions/payment-method";

export function RemovePaymentMethodButton({
  paymentMethodId,
  btn,
  name,
}: {
  paymentMethodId: string;
  btn: any;
  name: string;
}) {
  return (
    <FormContainer action={removePaymentMethodAction}>
      <input
        type="hidden"
        id={name}
        name={name}
        defaultValue={paymentMethodId}
      />
      <Button variant={"destructive"} type="submit">
        {btn}
      </Button>
    </FormContainer>
  );
}
