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
      navbar: true,
      navbarlogo: true,
      navbarlinks: true,
      footer: true,
      footerlinks: true,
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

  // create entry through prisma orm
  const updatePost = await prisma.user.update({
    where: {
      id: "1",
    },
    data: {
      navbar: datareceived.navbar,
      navbarlogo: datareceived.navbarlogo,
      navbarlinks: JSON.stringify(datareceived.navbarlinks),
      footer: datareceived.footer,
      footerlinks: JSON.stringify(datareceived.footerlinks),
    },
  });

  return NextResponse.json({
    ...updatePost,
  });
}
