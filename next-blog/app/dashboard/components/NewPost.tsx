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

import { Editor } from "@tinymce/tinymce-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  rslug: z.string().regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")),
  rtitle: z.string().trim().min(10),
  rmetakeys: z.string().includes(","),
  rmetadesc: z.string().min(100),
});

type FormFields = z.infer<typeof schema>;

const NewPost = () => {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: `
  //   <h2>Hi there,</h2>
  //   `,
  // });

  const [slug, setSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  // const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [metakeywords, setMetakeywords] = useState<string>("");
  const [metadescription, setMetadescription] = useState<string>("");
  const [preview, setPreview] = useState<Boolean>(false);

  const [content, setContent] = useState<string>();

  // const handleSubmit = async () => {

  //   setContent(editorhtml)
  //   //Validate form data
  //   //send to api
  //   const data = {
  //     rslug: slug,
  //     rtitle: title,
  //     rcontent: editorhtml,
  //     rimgurl: imageUrl,
  //     rmetakeys: metakeywords.split(","),
  //     rmetadesc: metadescription,
  //   };
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   };
  //   const response = await fetch("/api/posts/createnewpost", requestOptions);
  //   const res = await response.json();
  //   //on sucsess proceed
  //   //inform user that post created
  //   //reset this page states
  //   console.log(res);
  // };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      if (content) {
        const imgurlregex = new RegExp("(https?://.*.(?:png|jpg))");
        if (imgurlregex.test(imageUrl)) {
          //API CALL TO CREATE POST
          const reqdata = {
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
            body: JSON.stringify(reqdata),
          };
          const response = await fetch(
            "/api/posts/createnewpost",
            requestOptions
          );
          const res = await response.json();
          //on sucsess proceed
          //inform user that post created
          //reset this page states
          console.log("POSTED",res);
          
        } else {
          setError("root", {
            message: "Please Upload Opengraph Image",
          });
        }
      } else {
        setError("root", {
          message: "Please Write some content on blog",
        });
      }
    } catch (error) {
      setError("root", {
        message: "Something Wrong with Post API",
      });
    }
  };

  return (
    <>
      <div className={"flex flex-col p-4 gap-4"}>
        <div className="text-4xl">Create a New Post</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="bslug">Slug</Label>
                <Input
                  {...register("rslug")}
                  type="text"
                  id="bslug"
                  placeholder="Blog Tile"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                {errors.rslug && (
                  <div className="text-red-500">{errors.rslug.message}</div>
                )}
              </div>
              <div>
                <Label htmlFor="btitle">Title</Label>
                <Input
                  {...register("rtitle")}
                  type="text"
                  id="btitle"
                  placeholder="Blog Tile"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.rtitle && (
                  <div className="text-red-500">{errors.rtitle.message}</div>
                )}
              </div>
              <div>
                <Label htmlFor="tinymce">Content</Label>
                <Editor
                  value={content}
                  apiKey="xwu3jocjfocx1u9e4nw2a6lvttl2iplefdenva04882vkbws"
                  init={{
                    content_css: false,
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  initialValue="Welcome to TinyMCE!"
                  onEditorChange={(newValue, editor) => {
                    console.log(newValue);
                    setContent(newValue);
                  }}
                />
                {content}
                {/* <EditorContent editor={editor} id="tiptap" className="border" /> */}
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
                  {...register("rmetakeys")}
                  value={metakeywords}
                  onChange={(e) => setMetakeywords(e.target.value)}
                  type="text"
                  id="bmetakeys"
                  placeholder="Meta Keywords Here. Comma(,) seperated"
                />
                {errors.rmetakeys && (
                  <div className="text-red-500">{errors.rmetakeys.message}</div>
                )}
              </div>
              <div>
                <Label htmlFor="bdesc">Meta Description</Label>
                <Textarea
                  {...register("rmetadesc")}
                  value={metadescription}
                  onChange={(e) => setMetadescription(e.target.value)}
                  id="bdesc"
                  placeholder="Type your metaderscription(150 words) here."
                  maxLength={150}
                />
              </div>
              {errors.rmetadesc && (
                <div className="text-red-500">{errors.rmetadesc.message}</div>
              )}
              {errors.root && (
                <div className="text-red-500 text-sm">
                  {errors.root.message}
                </div>
              )}
              <div className="flex gap-4">
                {/* <Button variant="secondary" onClick={() => setPreview(true)}>
                  Preview
                </Button> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview</Button>
                  </DialogTrigger>
                  <DialogContent
                    className={
                      "lg:max-w-screen-lg overflow-y-scroll max-h-screen max-w-full"
                    }
                  >
                    <DialogHeader>
                      <DialogTitle>Preview</DialogTitle>
                      {/* <DialogDescription>
                 
                      </DialogDescription> */}
                    </DialogHeader>
                    <DialogHeader>
                      <PreviewPost title={title} content={content} />
                      {/* <PreviewPost title={title} content={editor?.getHTML()} /> */}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "POST"}
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default NewPost;
