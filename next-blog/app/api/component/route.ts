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
      htmlContent: datareceived.htmlContent,
      tailwindcss: datareceived.tailwindcss,
    },
  });

  return NextResponse.json({
    ...customcomponent,
  });
}
