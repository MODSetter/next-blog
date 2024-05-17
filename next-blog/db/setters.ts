import prisma from "./prismaclient";

export async function incView(postslug: string) {
  const updateView = await prisma.post.updateMany({
    where: {
      slug: postslug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export async function uploadImage(imageFile: File) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      "x-vercel-filename": imageFile.name,
      "content-type": imageFile.type,
    },
    body: imageFile,
  });
  const res = await req.json();

  console.log("BLOB RESPONSE", res);
}
