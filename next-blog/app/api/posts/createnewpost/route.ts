import { NextResponse } from "next/server"
import prisma from "../../../../db/prismaclient";

export async function POST(req: Request) {
    const datareceived = await req.json();
    console.log(datareceived)
    //create entry through prisma orm
    const postCreated = await prisma.post.create({
        data: {
            slug: datareceived.rslug,
            opengraphimage: datareceived.rimgurl,
            title: datareceived.rtitle,
            content: datareceived.rcontent,
            authorId: 1,
            metaKeywords: datareceived.rmetakeys,
            metaDescription: datareceived.rmetadesc
        },
    })

    return NextResponse.json({
        ...postCreated
    });
}