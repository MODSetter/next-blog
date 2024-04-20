import prisma from "./prismaclient";


export async function incView(slug: string) {
  const updateView = await prisma.post.updateMany({
    data: {
      views: {
        increment: 1,
      },
    }
  })
}