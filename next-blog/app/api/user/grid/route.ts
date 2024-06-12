import prisma from "@/db/prismaclient";
import { NextResponse } from "next/server";
import { validateRequest } from "@/actions/auth.actions";

export async function GET() {
        //Validate Session
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                error: "NOT AUTHORISED",
            });
        }


    const userrec = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })

    const grid = await prisma.grid.findUnique({
        where: {
            id: userrec?.maingrid
        },
    })

    return NextResponse.json(grid);
}


export async function PATCH(req: Request) {
        //Validate Session
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({
                error: "NOT AUTHORISED",
            });
        }

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

//Update Grid Val in User 
export async function PUT(req: Request) {
    const datareceived = await req.json();
    const user = await prisma.user.update({
        where:{
            id: "1"
        },
        data: {
            maingrid: datareceived.maingrid
        }
    })
    console.log("user api",user)
    return NextResponse.json({
        ...user
    });
}