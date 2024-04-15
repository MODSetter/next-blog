import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getPostsMetaWithPostSlug } from "../db/getters";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PostList = async () => {
  const allPostMetaData = await getPostsMetaWithPostSlug();
  // console.log(allPostMetaData);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {allPostMetaData.map(
          ({ slug, opengraphimage, title, metaDescription }) => (
            <Card className="w-[320px] rounded-3xl flex flex-col justify-between bg-zinc-200/10">
              <CardHeader className="gap-3">
                <CardTitle className="text-lg">{`${title}`}</CardTitle>

                <Image
                  src={opengraphimage}
                  alt="Picture of the author"
                  width={370}
                  height={100}
                  className="rounded-lg"
                />
              </CardHeader>
              <CardContent>
                {metaDescription}
              </CardContent>
              <Link href={`/${slug}`}>
              <CardFooter className="flex justify-center">
              <Button className="grow">Read More</Button>
              </CardFooter>
              </Link>
            </Card>
            // <div
            //   className="flex flex-row p-3 gap-x-4 border rounded-lg"
            //   key={slug}
            // >
            //   <div className="min-w-28">
            //     <Image
            //       src={opengraphimage}
            //       alt="Picture of the author"
            //       width={100}
            //       height={100}
            //     />
            //   </div>
            //   <div className="grow">
            //     <p className="text-4xl font-bold mb-4">{`${title}`}</p>
            //     <p className="text-sm">{metaDescription}</p>
            //   </div>
            //   <Button className="self-end">
            //     <Link href={`/${slug}`} className="text-lg font-bold">
            //       READ MORE
            //     </Link>
            //   </Button>
            // </div>
          )
        )}
      </div>
    </>
  );
};

export default PostList;
