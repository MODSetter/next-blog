import { NextResponse } from "next/server"
import prisma from "../../../../db/prismaclient";


export async function GET() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
            opengraphimage: true,
            title: true,
            metaDescription: true,
            updatedAt: true,
            views: true
        }
    })

    return NextResponse.json({
        ...posts
    });
}