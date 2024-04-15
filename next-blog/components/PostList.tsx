import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import postpic from "../public/images/unnamed.png";
import { getPostsMetaWithPostSlug } from "../db/getters";
import Link from "next/link";

const PostList = async () => {
  const allPostMetaData = await getPostsMetaWithPostSlug();
  // console.log(allPostMetaData);

  return (
    <>
      <div className="flex flex-col gap-3">
        {allPostMetaData.map(({ slug,opengraphimage, title, metaDescription }) => (
          <div
            className="flex flex-row p-3 gap-x-4 border rounded-lg"
            key={slug}
          >
            <div className="min-w-28">
              <Image
                src={opengraphimage}
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </div>
            <div className="grow">
              <p className="text-4xl font-bold mb-4">{`${title}`}</p>
              <p className="text-sm">{metaDescription}</p>
            </div>
            <Button className="self-end">
              <Link href={`/${slug}`} className="text-lg font-bold">
                READ MORE
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostList;
