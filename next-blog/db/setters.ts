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

export async function uploadFile(file: File) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      "x-vercel-filename": file.name,
      "content-type": file.type,
    },
    body: file,
  });
  const res = await req.json();
  console.log("BLOB RESPONSE", res);
  return res
}
