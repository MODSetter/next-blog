import prisma from "./prismaclient";

export async function getPostIdWithSlug(postslug: string) {
    const postInfo = await prisma.slug.findUnique({
        where: {
          slug: postslug
        }
    })
    return postInfo?.postId
}


export async function getPostWithPostId(postId: number|undefined) {
    const post = await prisma.post.findUnique({
        where:{
          id: postId
        }
    })
    return post
}


export async function getAllSlugs() {
    const allslugs = await prisma.slug.findMany()
    return allslugs
}


export async function getAllPosts() {
    const posts = await prisma.post.findMany()
    return posts
}



export async function getAllPostsWithSlug() {
    const postswithslugs = await prisma.post.findMany({
        include:{
            postSlug:{
                select:{
                    slug: true,
                }
            }
        }
    })
    return postswithslugs
}
