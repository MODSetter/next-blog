"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

const NewPost = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
    `,
  });

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="text-4xl">Create a New Post</div>
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
              <EditorContent editor={editor} id="tiptap" className="border" />
              {editor?.getHTML()}
            </div>
            <div>
              <Label htmlFor="opengraphimage">
                Opengraph Image(Used in social media)
              </Label>
              <Input id="opengraphimage" type="file" />
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
              <Button>POST</Button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default NewPost;
