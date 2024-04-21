"use client";
import { getPostBySlug } from "@/db/getters";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import { UploadDropzone } from "../../../../../utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import PreviewPost from "../../../../ui/dashboard/PreviewPost";

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
import { metadata } from "@/app/layout";

const schema = z.object({
  rtitle: z.string().trim().min(10),
  rmetakeys: z.string().includes(","),
  rmetadesc: z.string().min(100),
});

type FormFields = z.infer<typeof schema>;

interface EditPageProps {
  params: { postslug: string };
}

interface PostBySlug {
  authorId: number;
  content: string;
  metaDescription: string;
  metaKeywords: string[];
  opengraphimage: string;
  slug: string;
  title: string;
  updatedAt: Date;
  views: number;
}

import { useRouter } from 'next/navigation';

const page = ({ params: { postslug } }: EditPageProps) => {
  const [slug, setSlug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [metakeys, setMetakeys] = useState<string>("");
  const [metadesc, setMetadesc] = useState<string>("");

  const router = useRouter()

  useEffect(() => {
    fetch(`/api/posts/getpostbyslug/${postslug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //set states for init load in inputs
        setValue('rtitle', data.title)
        setValue('rmetakeys', data.metaKeywords.toString())
        setValue('rmetadesc', data.metaDescription)
        setSlug(data.slug);
        setTitle(data.title);
        setImageUrl(data.opengraphimage);
        setContent(data.content);
        setMetakeys(data.metaKeywords.toString());
        setMetadesc(data.metaDescription);
      });
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
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

            //API CALL TO UPDATE POST
            const reqdata = {
              rslug: slug,
              rtitle: data.rtitle,
              rcontent: content,
              rimgurl: imageUrl,
              rmetakeys: data.rmetakeys.split(","),
              rmetadesc: data.rmetadesc,
            };
            const requestOptions = {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(reqdata),
            };
            const response = await fetch(
              "/api/posts/",
              requestOptions
            );
            const res = await response.json();
            alert('Post Updated');
            router.push("/dashboard/posts")
            //on sucsess proceed
            //inform user that post created
            //reset this page states
            console.log("UPDATED", res);
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
        <div className="text-4xl">Edit Post</div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  disabled={true}
                />
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
                  apiKey="xwu3jocjfocx1u9e4nw2a6lvttl2iplefdenva04882vkbws"
                  init={{
                    content_css: false,
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  value={content}
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

                {
                    imageUrl?.length ? (
                        <div className="flex gap-4">
                            <Image 
                            src={imageUrl} 
                            alt={"opengraphimage"}
                            width={100}
                            height={100}
                            ></Image>
                            <Button onClick={() => setImageUrl("")}>Remove</Button>
                        </div>
                    ) : (                
                    <UploadDropzone
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
                      />)
                }
                
              </div>
              <div>
                <Label htmlFor="bmetakeys">Meta Keywords</Label>
                <Input
                  {...register("rmetakeys")}
                  type="text"
                  id="bmetakeys"
                  placeholder="Meta Keywords Here. Comma(,) seperated"
                  value={metakeys}
                  onChange={(e) => setMetakeys(e.target.value)}
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
                  value={metadesc}
                  onChange={(e) => setMetadesc(e.target.value)}
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
                      <PreviewPost title={title} content={content} />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "EDIT"}
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
