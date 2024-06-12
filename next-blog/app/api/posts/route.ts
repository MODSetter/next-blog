import { NextResponse } from "next/server";
import prisma from "@/db/prismaclient";
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

  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      opengraphimage: true,
      title: true,
      metaDescription: true,
      updatedAt: true,
      views: true,
      tags: true,
      author: true,
    },
    where: {
      visibility: true,
    },
  });

  return NextResponse.json([...posts]);
}

//Post a new post
export async function POST(req: Request) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }

  const datareceived = await req.json();
  // console.log("DATA REC",datareceived);
  let ctags: { where: { tagname: string }; create: { tagname: string } }[] = [];

  if (datareceived.rtags) {
    datareceived.rtags.forEach((data: any) => {
      const query = {
        where: {
          tagname: data.text.toLowerCase(),
        },
        create: {
          tagname: data.text.toLowerCase(),
        },
      };
      ctags.push(query);
    });
  }

  //create entry through prisma orm
  const postCreated = await prisma.post.create({
    data: {
      slug: datareceived.rslug,
      opengraphimage: datareceived.rimgurl,
      title: datareceived.rtitle,
      content: datareceived.rcontent,
      authorId: "1",
      metaKeywords: datareceived.rmetakeys,
      metaDescription: datareceived.rmetadesc,
      visibility: datareceived.rvisibility,
      tags: {
        connectOrCreate: [...ctags],
      },
    },
  });

  // console.log("Post Created",postCreated);

  return NextResponse.json({
    ...postCreated,
    // message: "...postCreated",
  });
}

//Edit a old post
export async function PATCH(req: Request) {
  //Validate Session
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({
      error: "NOT AUTHORISED",
    });
  }

  const datareceived = await req.json();
  let ctags: { where: { tagname: string }; create: { tagname: string } }[] = [];

  if (datareceived.rtags) {
    datareceived.rtags.forEach((data: any) => {
      const query = {
        where: {
          tagname: data.text.toLowerCase(),
        },
        create: {
          tagname: data.text.toLowerCase(),
        },
      };
      ctags.push(query);
    });
  }

  //create entry through prisma orm
  const updatePost = await prisma.post.update({
    where: {
      slug: datareceived.nslug,
    },
    data: {
      slug: datareceived.rslug,
      opengraphimage: datareceived.rimgurl,
      title: datareceived.rtitle,
      content: datareceived.rcontent,
      authorId: "1",
      metaKeywords: datareceived.rmetakeys,
      metaDescription: datareceived.rmetadesc,
      visibility: datareceived.rvisibility,
      tags: {
        connectOrCreate: [...ctags],
      },
    },
  });

  return NextResponse.json({
    ...updatePost,
  });
}
