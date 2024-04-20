import prisma from "./prismaclient";


export async function getPostsMetaWithPostSlug() {
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
    return posts
}


export async function getPostBySlug(postslug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: postslug
        }
    })
    return post
}



