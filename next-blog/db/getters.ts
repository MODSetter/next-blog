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



export async function getUser() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })
    return user
}

export async function getGrid() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
    })
    return user?.maingrid
}


export async function getGridData(gridId: string | undefined) {
    const grid = await prisma.grid.findUnique({
        where: {
            id: gridId
        },
    })
    return grid
}

export async function checkSlug(postslug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: postslug
        },
    })
    return post
}



