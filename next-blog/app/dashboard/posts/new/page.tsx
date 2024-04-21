"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { UploadDropzone } from "../../../../utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import PreviewPost from "../../../ui/dashboard/PreviewPost";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";


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
import { useRouter } from "next/navigation";


const schema = z.object({
  rslug: z.string().regex(new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$")),
  rtitle: z.string().trim().min(10),
  rmetakeys: z.string().includes(","),
  rmetadesc: z.string().min(100),
});

type FormFields = z.infer<typeof schema>;

const page = () => {
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  // useEffect(() => {
  //   const content = window.localStorage.getItem("novel-html");
  //   console.log(content)
    
  // }, []);


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
      const novelhtml = window.localStorage.getItem("novel-html");
      console.log("NOVELHTML",novelhtml)
      console.log(data);
      if (novelhtml) {
        const imgurlregex = new RegExp("(https?://.*.(?:png|jpg))");
        if (imgurlregex.test(imageUrl)) {
          //API CALL TO CREATE POST
          const reqdata = {
            rslug: data.rslug,
            rtitle: data.rtitle,
            rcontent: novelhtml,
            rimgurl: imageUrl,
            rmetakeys: data.rmetakeys.split(","),
            rmetadesc: data.rmetadesc,
          };
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
          };
          const response = await fetch("/api/posts", requestOptions);

          // if(response.ok){
          //   redirect('/dashboard/posts');
          // }
          const res = await response.json();
          console.log("POSTED", res);
          alert("Post Posted");
          router.push("/dashboard/posts");
          // if(res.ok){

          // }
          //on sucsess proceed
          //inform user that post created
          //reset this page states
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

  // const [editcon, setEditcon] = useState<JSONContent>({});

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
                <TailwindAdvancedEditor />
                {/* <EditorRoot><EditorContent extensions={defaultExtensions}></EditorContent></EditorRoot> */}

                {/* <Editor
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
                /> */}
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
                    </DialogHeader>
                    <DialogHeader>
                      <PreviewPost title={title} content={""} />
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

export default page;
