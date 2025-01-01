import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

export const fetchBranchesResSchema = templateResponse(
    z.array(
        z.object({
            name: z.string(),
            branchCode: z.string(),
            phoneNumber: z.string(),
            address: z.string(),
            id: z.string(),
            createdAt: z.string(),
            updatedAt: z.string(),
        })
    )
);