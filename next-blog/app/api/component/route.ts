import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";

export async function GET() {
    const components = await prisma.customComponent.findMany()

    return NextResponse.json([...components]);
}


export async function POST(req: Request) {
    const datareceived = await req.json();

    const customcomponent = await prisma.customComponent.create({
        data: {
            id: datareceived.name,
            htmlContent: datareceived.htmlContent,
            tailwindcss: datareceived.tailwindcss
        },
    })

    return NextResponse.json({
        ...customcomponent
    });
}