import prisma from "@/db/prismaclient";
import { NextResponse } from "next/server";
export async function GET() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })

    const grid = await prisma.grid.findUnique({
        where: {
            id: user?.maingrid
        },
    })

    return NextResponse.json(grid);
}


export async function PATCH(req: Request) {
    const datareceived = await req.json();
    const grid = await prisma.grid.update({
        where:{
            id: datareceived.gridId
        },
        data: {
            comp_one: datareceived.compone,
            comp_two: datareceived.comptwo,
            comp_three: datareceived.compthree,
            comp_four: datareceived.compfour,
            comp_five: datareceived.compfive,
        }
    })
    return NextResponse.json({
        ...grid
    });
}