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
    // console.log(posts)
    return posts
}


export async function getPostBySlug(postslug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: postslug
        },
    })
    return post
}

export async function getViews() {
    const views = await prisma.post.findMany({
        select: {
            views: true
        }
    })
    return views
}



