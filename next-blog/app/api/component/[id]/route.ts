import { NextResponse } from "next/server"
import prisma from "@/db/prismaclient";

type Params = {
    id: string
}

export async function GET(request: Request, context: { params: Params }) {
    const res = await prisma.customComponent.findUnique({
        where: {
            id: context.params.id,
        },
    })
    return NextResponse.json({
        ...res
    });
}