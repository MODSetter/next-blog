import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";

type Params = {
  postslug: string;
};

//gets github discussion
export async function GET(request: Request, context: { params: Params }) {

  const discussion = await prisma.githubDiscussions.findUnique({
    where: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/discussions/${context.params.postslug}`,
    },
  });

  return NextResponse.json({
    ...discussion,
  });
}
