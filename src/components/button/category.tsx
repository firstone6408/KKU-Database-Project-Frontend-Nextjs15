/** @format */

import { removeCategoryAction } from "@/server-actions/category";
import FormContainer from "../form/form-container";
import { Button } from "../ui/button";

export function RemoveCategoryButton({
  categoryId,
  btn,
  name,
}: {
  categoryId: string;
  btn: any;
  name: string;
}) {
  return (
    <FormContainer action={removeCategoryAction}>
      <input
        type="hidden"
        id={name}
        name={name}
        defaultValue={categoryId}
      />
      <Button variant={"destructive"} type="submit">
        {btn}
      </Button>
    </FormContainer>
  );
}
