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
  const [posttslug, setPosttslug] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [opengraphimage, setOpengraphimage] = useState<string>("");
  const [metakeywords, setMetakeywords] = useState<string>(",");
  const [metadescription, setMetadescription] = useState<string>("");

  const [metadatasubmitedflag, setMetadatasubmitedflag] =
    useState<boolean>(true);

  const [previewhtml, setPreviewhtml] = useState<string | null>("");
  const [novelerror, setNovelerror] = useState<string>();

  const router = useRouter();

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
      setPosttslug(data.rslug);
      setTitle(data.rtitle);
      setMetakeywords(data.rmetakeys);
      setMetadescription(data.rmetadesc);

      //To check if its image url
      console.log("openimage", opengraphimage);
      if (opengraphimage.length) {
        const imgurlregex = new RegExp("(https?://.*.(?:png|jpg))");
        if (!imgurlregex.test(opengraphimage)) {
          setError("root", {
            message: "Please Upload Opengraph Image",
          });
        }
        console.log("META DATA SUBMITTED", data);
        //to show novel editor after verifying metas
        setMetadatasubmitedflag(true);
      } else {
        setError("root", {
          message: "Please Upload Opengraph Image",
        });
      }
    } catch (error) {
      setError("root", {
        message: "Something Wrong with Meta Data Submitted",
      });
    }
  };

  const submitFinalData = async () => {
    try {
      const editorhtml = window.localStorage.getItem("novel-html");
      if (editorhtml) {
        //API CALL TO CREATE POST
        const reqdata = {
          rslug: posttslug,
          rtitle: title,
          rcontent: editorhtml,
          rimgurl: opengraphimage,
          rmetakeys: metakeywords.split(","),
          rmetadesc: metadescription,
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqdata),
        };
        const response = await fetch("/api/posts", requestOptions);

        const res = await response.json();
        console.log("POSTED", res);
        alert("Post Posted");
        //empty local storage to reset editor
        window.localStorage.removeItem("novel-content")
        window.localStorage.setItem("novel-html", "");
        router.push("/dashboard/posts");
      } else {
        setNovelerror("Something Wrong with editor content");
      }
    } catch (error) {
      setNovelerror("Something Wrong with editor content");
    }
  };

  const updatepreviewData = async () => {
    setPreviewhtml(window.localStorage.getItem("novel-html"));
  };

  return (
    <>
      <div className="text-4xl my-4">Create a New Post</div>
      {metadatasubmitedflag ? (
        <div>
          <Label htmlFor="noveleditor">Blog Content:</Label>
          <div id="noveleditor" className="flex flex-col items-center gap-4 py-4 sm:px-5">
            <TailwindAdvancedEditor />
          </div>

          {novelerror?.length ? (<div className="text-red-500 text-xs">{novelerror}</div>) : ""}
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => updatepreviewData()}>
                  Preview
                </Button>
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
                  <PreviewPost title={title} content={previewhtml} dateposted={new Date()}/>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button onClick={() => submitFinalData()}>POST</Button>
          </div>
        </div>
      ) : (
        <div className={"flex flex-col p-4 gap-4"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                MetaData
              </legend>
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
                    <div className="text-red-500 text-xs">{errors.rslug.message}</div>
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
                    <div className="text-red-500 text-xs">{errors.rtitle.message}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="opengraphimage">
                    Opengraph Image(Used in social media)
                  </Label>
                  {opengraphimage.length ? (
                    <div>
                      <Image
                        src={opengraphimage}
                        alt="uploadthingimage"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <UploadDropzone
                    className={opengraphimage.length ? "hidden" : ""}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      setOpengraphimage(res[0].url);
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
                    <div className="text-red-500 text-xs">
                      {errors.rmetakeys.message}
                    </div>
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
                  <div className="text-red-500 text-xs">{errors.rmetadesc.message}</div>
                )}
                {errors.root && (
                  <div className="text-red-500 text-xs">
                    {errors.root.message}
                  </div>
                )}
                <div className="flex gap-4">
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Loading..." : "Proceed"}
                  </Button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};

export default page;
