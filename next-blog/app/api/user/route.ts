import { NextResponse } from "next/server"
import prisma from "../../../db/prismaclient";

//Get All Posts
export async function GET() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })

    return NextResponse.json(user);
}