import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";
import { validateRequest } from "@/actions/auth.actions";

type Params = {
  id: string;
};

export async function GET(request: Request, context: { params: Params }) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }

  const res = await prisma.customComponent.findUnique({
    where: {
      id: context.params.id,
    },
  });
  return NextResponse.json({
    ...res,
  });
}
