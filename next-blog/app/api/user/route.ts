import { NextResponse } from "next/server"
import prisma from "../../../db/prismaclient";
import { hash } from "@node-rs/argon2";

//Get All Posts
export async function GET() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })

    return NextResponse.json(user);
}



//Edit User Admin Table
export async function PATCH(req: Request) {
    const datareceived = await req.json();

    const passwordHash = await hash(datareceived.adminpass, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    
    //create entry through prisma orm
    const updatePost = await prisma.user.update({
        where: {
            id: "1",
        },
        data: {
            name: datareceived.adminname,
            avatar: datareceived.avatar,
            username: datareceived.adminusername,
            password_hash: passwordHash,
        },
    })

    return NextResponse.json({
        ...updatePost
    });
}
