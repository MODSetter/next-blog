import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import { UploadDropzone } from "../../../utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
import PreviewPost from "./PreviewPost";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NewPost = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <h2>Hi there,</h2>
    `,
  });

  const [slug, setSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [metakeywords, setMetakeywords] = useState<string>("");
  const [metadescription, setMetadescription] = useState<string>("");
  const [preview, setPreview] = useState<Boolean>(false);

  const handleSubmit = async () => {
    const contentRec = editor?.getHTML();
    if (contentRec?.length) {
      setContent(contentRec);
    }
    //Validate form data
    //send to api
    const data = {
      rslug: slug,
      rtitle: title,
      rcontent: content,
      rimgurl: imageUrl,
      rmetakeys: metakeywords.split(","),
      rmetadesc: metadescription,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch("/api/posts", requestOptions);
    const res = await response.json();
    //on sucsess proceed
    //inform user that post created
    //reset this page states
    console.log(res);
  };

  return (
    <>
      {/* <div className={preview ? "" : "hidden"}>
        <Button onClick={() => setPreview(false)}>Go Back</Button>
        <PreviewPost title={title} content={editor?.getHTML()} />
        
      </div> */}
      <div className={"flex flex-col p-4 gap-4"}>
        <div className="text-4xl">Create a New Post</div>
        <div>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="bslug">Slug</Label>
                <Input
                  type="text"
                  id="bslug"
                  placeholder="Blog Tile"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="btitle">Title</Label>
                <Input
                  type="text"
                  id="btitle"
                  placeholder="Blog Tile"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tiptap">Content</Label>
                <EditorContent editor={editor} id="tiptap" className="border" />
              </div>
              <div>
                <Label htmlFor="opengraphimage">
                  Opengraph Image(Used in social media)
                </Label>
                {imageUrl.length ? (
                  <div>
                    <Image
                      src={imageUrl}
                      alt="uploadthingimage"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  ""
                )}

                <UploadDropzone
                  className={imageUrl.length ? "hidden" : ""}
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    setImageUrl(res[0].url);
                    console.log("Files: ", res);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="bmetakeys">Meta Keywords</Label>
                <Input
                  value={metakeywords}
                  onChange={(e) => setMetakeywords(e.target.value)}
                  type="text"
                  id="bmetakeys"
                  placeholder="Meta Keywords Here. Comma(,) seperated"
                />
              </div>
              <div>
                <Label htmlFor="bdesc">Meta Description</Label>
                <Textarea
                  value={metadescription}
                  onChange={(e) => setMetadescription(e.target.value)}
                  name="metadesc"
                  id="bdesc"
                  placeholder="Type your metaderscription(150 words) here."
                  maxLength={150}
                />
              </div>
              <div className="flex gap-4">
                {/* <Button variant="secondary" onClick={() => setPreview(true)}>
                  Preview
                </Button> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview</Button>
                  </DialogTrigger>
                  <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen max-w-full"}>
                    <DialogHeader>
                      <DialogTitle>Preview</DialogTitle>
                      {/* <DialogDescription>
                 
                      </DialogDescription> */}
                    </DialogHeader>
                    <DialogHeader>
                    <PreviewPost
                          title={title}
                          content={editor?.getHTML()}
                        />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleSubmit()}>POST</Button>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default NewPost;
