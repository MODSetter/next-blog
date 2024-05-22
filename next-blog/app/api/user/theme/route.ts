import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";

export async function GET() {
    const user = await prisma.user.findUnique({
        where: {
            id: "1"
        },
        select: {
            defaultLight: true,
            defaultDark: true
        }
    })

    return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const datareceived = await req.json();

  //create entry through prisma orm
  const updatePost = await prisma.user.update({
    where: {
      id: "1",
    },
    data: {
      defaultLight: datareceived.defaultLight,
      defaultDark: datareceived.defaultDark,
    },
  });

  return NextResponse.json({
    ...updatePost,
  });
}
