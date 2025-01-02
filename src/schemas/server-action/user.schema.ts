import { UserRole } from "@/configs/enum.config";
import { z } from "zod";

export const AddUserFormDataSchema = z.object(
    {
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
        profileImage: z.instanceof(File).optional(),
        phoneNumber: z
            .string()
            .optional()
            .refine(
                (val) => !val || val.length >= 10,
                { message: "เบอร์โทรต้องมีความยาวมากกว่า 10 ตัว" }
            ),
        role: z.nativeEnum(UserRole),
    }
);