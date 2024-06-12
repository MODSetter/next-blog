import { NextResponse } from "next/server"
import prisma from "@/db/prismaclient";
import { validateRequest } from "@/actions/auth.actions";

type Params = {
    postslug: string
}

export async function GET(request: Request, context: { params: Params }) {
    //Validate Session
    const { user } = await validateRequest();
    if (!user) {
        return NextResponse.json({
            error: "NOT AUTHORISED",
        });
    }

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