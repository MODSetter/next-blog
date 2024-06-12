import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";
import { validateRequest } from "@/actions/auth.actions";

export async function GET() {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }
  const userrec = await prisma.user.findUnique({
    where: {
      id: "1",
    },
    select: {
      defaultLight: true,
      defaultDark: true,
    },
  });

  return NextResponse.json(userrec);
}

export async function PATCH(req: Request) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }

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
