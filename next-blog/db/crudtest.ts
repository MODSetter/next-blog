import prisma from "./prismaclient";

async function createPostWithSlug() {
    const author = await prisma.user.create({
        data: {
            email: "admin@nb.com",
            passwordHash: "xyz",
            name: "Admin"
        }
    });

    const post = await prisma.post.create({
        data:{
            title: "TTITLE",
            content: "TCONTENT",
            authorId: author.id,
            metaDescription: "TMETADESCRIPTION",
            metaKeywords : ["SEO","TEST"]
        }
    });

    const slug = await prisma.slug.create({
        data: {
            slug: "test-post",
            postId: post.id
        }
    })



    const postData = await prisma.post.findUnique({
        where: {
            id: slug.postId
        },
        include:{
            postSlug: {
                select:{
                    slug: true,
                    postId: true
                }
            }
        }
    })

    return { postData }
}

//console.log(createPostWithSlug())
// createPostWithSlug()



// export const getServerSideProps = async () => {
//     const users = prisma.user.findMany()
  
//     return { props: { users } }
// }