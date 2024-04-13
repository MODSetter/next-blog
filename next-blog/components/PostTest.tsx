import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import postpic from "../public/images/unnamed.png";
import { getPostsMetaWithPostSlug } from "../db/getters";
import Link from "next/link";

const PostTest = async () => {
  const allPostMetaData = await getPostsMetaWithPostSlug();
  // console.log(allPostMetaData);

  return (
    <>
      {allPostMetaData.map(({ slug, title, metaDescription }) => (
        <div className="flex flex-row p-3 gap-x-4 border rounded-lg" key={slug}>
          <div>
            <Image
              src={postpic}
              alt="Picture of the author"
              sizes="100vh"
              // Make the image display full width
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="grow">
            <p className="text-xl font-bold">{`${title}`}</p>
            <p className="text-sm">{metaDescription}</p>
          </div>
          <Button className="self-end">
            <Link href={`/${slug}`} className="text-lg font-bold">
              READ MORE
            </Link>
          </Button>
        </div>
      ))}
    </>
  );
};

export default PostTest;
