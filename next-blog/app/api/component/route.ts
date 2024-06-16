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
  const components = await prisma.customComponent.findMany();

  return NextResponse.json([...components]);
}

export async function POST(req: Request) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }
  const datareceived = await req.json();

  const customcomponent = await prisma.customComponent.create({
    data: {
      id: datareceived.name,
      content: datareceived.content,
      tailwindcss: datareceived.tailwindcss,
    },
  });

  return NextResponse.json({
    ...customcomponent,
  });
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
  // console.log(datareceived)

  const customcomponent = await prisma.customComponent.update({
    where: {
      id: datareceived.oldname
    },
    data: {
      id: datareceived.newname,
      content: datareceived.content,
      tailwindcss: datareceived.tailwindcss,
    },
  });

  return NextResponse.json({
    ...customcomponent,
  });
}
