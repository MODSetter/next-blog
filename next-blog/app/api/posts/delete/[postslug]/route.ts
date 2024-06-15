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


    const deletePost = await prisma.post.delete({
        where: {
            slug: context.params.postslug,
        },
    })

    // console.log("POST",post)
    return NextResponse.json({
        ...deletePost
    });
}