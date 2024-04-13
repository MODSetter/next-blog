import prisma from "./prismaclient";

// export async function getPostIdWithSlug(postslug: string) {
//     const postInfo = await prisma.slug.findUnique({
//         where: {
//           slug: postslug
//         }
//     })
//     return postInfo?.postId
// }


export async function getPostsMetaWithPostSlug() {
    const posts = await prisma.post.findMany({
        select: {
            slug: true,
            title: true,
            metaDescription: true,
        }
    })
    return posts
}


// export async function getAllSlugs() {
//     const allslugs = await prisma.slug.findMany()
//     return allslugs
// }


export async function getPostBySlug(postslug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: postslug
        }
    })
    return post
}



