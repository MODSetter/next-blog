"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import postpic from "../../../public/images/unnamed.png";
import Image from "next/image";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const EditPost = () => {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="text-4xl">Edit Post</div>
      <div>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="btitle">Title</Label>
              <Input type="email" id="btitle" placeholder="Blog Tile" />
            </div>
            <div>
            <Label htmlFor="tiptap">Content</Label>
            <EditorContent editor={editor} id="tiptap" className="border"/>
            </div>
            <div>
              <Label htmlFor="opengraphimage">
                Opengraph Image(Used in social media)
              </Label>
              <Image
                id="opengraphimage"
                src={postpic}
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </div>
            <div>
              <Label htmlFor="bmetakeys">Meta Keywords</Label>
              <Input
                type="email"
                id="bmetakeys"
                placeholder="Meta Keywords Here. Comma(,) seperated"
              />
            </div>
            <div>
              <Label htmlFor="bdesc">Meta Description</Label>
              <Textarea
                id="bdesc"
                placeholder="Type your metaderscription(150 words) here."
                maxLength={150}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="secondary">Preview</Button>
              <Button>Make Changes</Button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default EditPost;
