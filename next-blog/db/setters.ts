import prisma from "./prismaclient";


export async function incView(postslug: string) {
  const updateView = await prisma.post.updateMany({
    where:{
      slug: postslug,
    },
    data: {
      views: {
        increment: 1,
      },
    }
  })
}