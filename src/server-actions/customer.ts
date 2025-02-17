/** @format */

import { urlConfig } from "@/configs/url.config";
import {
  fetchCustomerGroupsResSchema,
  fetchCustomerResSchema,
  fetchCustomersResSchema,
} from "@/schemas/api/customer";
import {
  AddCustomerFormDataSchema,
  UpdateCustomerFormDataSchema,
} from "@/schemas/server-action/customer.schema";
import { withApiHandling } from "@/utils/api.utils";
import { buildHeaders } from "@/utils/httpHeaders";
import { renderFail } from "@/utils/server-action-render.utils";
import { getSession } from "@/utils/session.utils";
import { validateFormDataWithZod } from "@/utils/validate.utils";
import axios from "axios";
import { redirect } from "next/navigation";

export async function fetchCustomers() {
  const user = (await getSession()).user;
  // console.log("User:", user)
  const { result, error } = await withApiHandling(
    () =>
      axios.get(
        `${urlConfig.KKU_API_URL}/customers/branch/${user.branchId}/`,
        { headers: buildHeaders({ token: user.token }) }
      ),
    { option: { validateResponse: fetchCustomersResSchema } }
  );
  return result.payload.data;
}
export type CustomerType = Awaited<
  ReturnType<typeof fetchCustomers>
>[number];

export async function fetchCustomerByCustomerId(customerId: string) {
  const user = (await getSession()).user;
  const { result, error } = await withApiHandling(
    () =>
      axios.get(`${urlConfig.KKU_API_URL}/customers/${customerId}/`, {
        headers: buildHeaders({ token: user.token }),
      }),
    { option: { validateResponse: fetchCustomerResSchema } }
  );
  return result.payload.data;
}

export async function fetchCustomerGroups() {
  const user = (await getSession()).user;

  const { result } = await withApiHandling(
    () =>
      axios.get(`${urlConfig.KKU_API_URL}/customer-groups`, {
        headers: buildHeaders({ token: user.token }),
      }),
    { option: { validateResponse: fetchCustomerGroupsResSchema } }
  );
  return result.payload.data;
}
export type CustomerGroupType = Awaited<
  ReturnType<typeof fetchCustomerGroups>
>[number];

export async function updateCustomerAction(
  prevState: any,
  formData: FormData
) {
  let pathname: string;
  try {
    //console.log(prevState)
    const user = (await getSession()).user;
    const data = validateFormDataWithZod(
      formData,
      UpdateCustomerFormDataSchema
    );
    pathname = data.pathname ?? "/customer";

    const { id, ...payload } = data;

    await withApiHandling(() =>
      axios.put(`${urlConfig.KKU_API_URL}/customers/${id}`, payload, {
        headers: buildHeaders({ token: user.token }),
      })
    );

    // return renderSuccess({ message: response.data.message });
  } catch (error) {
    return renderFail({ error });
  }

  redirect(pathname);
}

export async function addCustomerAction(
  prevState: any,
  formData: FormData
) {
  try {
    const user = (await getSession()).user;

    const validate = validateFormDataWithZod(
      formData,
      AddCustomerFormDataSchema
    );
    //console.log("validate:", validate)
    const payload = {
      ...validate,
      userId: user.id,
      branchId: user.branchId,
    };

    const { error } = await withApiHandling(() =>
      axios.post(`${urlConfig.KKU_API_URL}/customers`, payload, {
        headers: buildHeaders({ token: user.token }),
      })
    );

    if (error.status === "error") {
      return renderFail({ error: error.errorMessage });
    }
  } catch (error) {
    return renderFail({ error });
  }

  redirect("/customer");
}
