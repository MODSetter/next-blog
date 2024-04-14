"use client";
import React from "react";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("./custom-editor");
  },
  { ssr: false }
);

const NewPost = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="text-4xl">Create a New Post</div>
      <div>
        <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
      </div>
    </div>
  );
};

export default NewPost;
