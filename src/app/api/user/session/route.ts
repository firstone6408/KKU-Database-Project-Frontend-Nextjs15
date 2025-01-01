import { getSession } from "@/utils/session.utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request: NextRequest)
{
    try
    {
        const session = await getServerSession(authOptions);

        if (!session)
        {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = session.user;

        const { branchId } = await request.json() as { branchId: string };
        user.branchId = branchId;

        console.log(user)
        console.log("branchId:", branchId)
        console.log("user branchId:", user.branchId)

        return NextResponse.json({ ok: true, message: "Branch ID Updated" });
    } catch (error)
    {
        throw error;
    }

}