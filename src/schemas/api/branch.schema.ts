import { templateResponse } from "@/utils/api.utils";
import { z } from "zod";

const standardResponse = z.object({
    name: z.string(),
    branchCode: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const fetchBranchesResSchema = templateResponse(
    z.array(standardResponse)
);

export const getBranchByIdResSchema = templateResponse(standardResponse);