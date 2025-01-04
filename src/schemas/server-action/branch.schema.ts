import { z } from "zod";

const standard = z.object(
    {
        id: z.string().uuid(),
        branchCode: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        name: z.string(),
        pathname: z.string().optional(),
    }
);

export const UpdateBranchFormDataSchema = standard;

export const AddBranchFormDataSchema = standard.omit({ id: true });

export const RemoveBranchFormDataSchema = z.object({ id: z.string().uuid(), pathname: z.string().optional() })