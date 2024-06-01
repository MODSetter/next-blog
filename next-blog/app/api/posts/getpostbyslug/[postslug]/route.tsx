import { NextResponse } from "next/server"
import prisma from "../../../../../db/prismaclient";

type Params = {
    postslug: string
}

export async function GET(request: Request, context: { params: Params }) {
    const post = await prisma.post.findUnique({
        where: {
            slug: context.params.postslug
        },
        include: {
            tags: true,
            author: true
        },
    })

    // console.log("POST",post)
    return NextResponse.json({
        ...post
    });
}