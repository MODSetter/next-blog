import { NextResponse } from "next/server"
import prisma from "@/db/prismaclient";

export async function PATCH(req: Request) {
    const datareceived = await req.json();
  
    //create entry through prisma orm
    const updatePost = await prisma.user.update({
      where: {
        id: "1",
      },
      data: {
        navbar: datareceived.navbar,
        navbarlogo: datareceived.navbarlogo,
        navbarlinks: datareceived.navbarlinks,
        footer: datareceived.footer,
        footerlinks: datareceived.footerlinks
      },
    });
  
    return NextResponse.json({
      ...updatePost,
    });
  }
  