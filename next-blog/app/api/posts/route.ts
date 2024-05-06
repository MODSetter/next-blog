import { NextResponse } from "next/server"
import prisma from "../../../db/prismaclient";

//Get All Posts
export async function GET() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
            opengraphimage: true,
            title: true,
            metaDescription: true,
            updatedAt: true,
            views: true,
            tags: true,
        }
    })

    return NextResponse.json([...posts]);
}

//Post a new post
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

//Edit a old post
export async function PATCH(req: Request) {
    const datareceived = await req.json();
    console.log(datareceived)
    //create entry through prisma orm
    const updatePost = await prisma.post.update({
        where: {
            slug: datareceived.rslug,
        },
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
        ...updatePost
    });
}