import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import postpic from "../public/images/unnamed.png"
import { Card } from "./ui/card";

const PostTest = () => {
  return (
    <div className="flex flex-row p-2 gap-x-4 border rounded-lg">
      <div>
        <Image
          src={postpic}
          alt="Picture of the author"
          sizes="150px"
          // Make the image display full width
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="grow">
        <p className="text-xl font-bold">Lorem ipsum dolor sit amet consectetur</p>
        <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut fugit omnis veniam magni pariatur molestiae in dolorem? Autem unde, sint odio id doloribus quidem laborum molestiae dolorem expedita ea iure?</p>
      </div>
      <Button className="self-end">READ MORE</Button>
    </div>
  );
};

export default PostTest;
