import { NextResponse } from "next/server"
import prisma from "@/db/prismaclient";


export async function GET() {
  const user = await prisma.user.findUnique({
      where: {
          id: "1"
      },
      select: {
        navbar: true,
        navbarlogo: true,
        navbarlinks: true,
        footer: true,
        footerlinks: true
      }
  })

  return NextResponse.json(user);
}



export async function PATCH(req: Request) {
    const datareceived = await req.json();

    console.log(datareceived);
  
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
        footerlinks: JSON.stringify(datareceived.footerlinks)
      },
    });
  
    return NextResponse.json({
      ...updatePost
    });
  }
  