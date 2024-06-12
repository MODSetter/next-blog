import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";
import { hash } from "@node-rs/argon2";
import { validateRequest } from "@/actions/auth.actions";

//Get All Posts
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
  });

  return NextResponse.json(userrec);
}

//Edit User Admin Table
export async function PATCH(req: Request) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }

  const datareceived = await req.json();

  const passwordHash = await hash(datareceived.adminpass, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  //create entry through prisma orm
  const updatePost = await prisma.user.update({
    where: {
      id: "1",
    },
    data: {
      name: datareceived.adminname,
      avatar: datareceived.avatar,
      username: datareceived.adminusername,
      password_hash: passwordHash,
    },
  });

  return NextResponse.json({
    ...updatePost,
  });
}
