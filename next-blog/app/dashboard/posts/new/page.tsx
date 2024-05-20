"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/tailwind/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast"
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import ImageUploadForm from "@/components/image-upload/ImageUploadForm";
import { useRouter } from "next/navigation";


const slugFormSchema = z.object({
  slug: z.string().min(3, {
    message: "Slug must be at least 3 characters.",
  }),
})

const postdataFormSchema = z.object({
  posttitle: z.string().min(3, {
    message: "Post Title must be at least 3 characters.",
  }),
})

const metadataFormSchema = z.object({
  metakeywords: z.string(),
  metadescription: z.string().min(200, {
    message: "Meta Description must be at least 200 characters.",
  }),
})



export const page = () => {
  const router = useRouter();
  const slugform = useForm<z.infer<typeof slugFormSchema>>({
    resolver: zodResolver(slugFormSchema),
    defaultValues: {
      slug: "",
    },
  })

  const postdataform = useForm<z.infer<typeof postdataFormSchema>>({
    resolver: zodResolver(postdataFormSchema),
    defaultValues: {
      posttitle: "",
    },
  })


  const metadataform = useForm<z.infer<typeof metadataFormSchema>>({
    resolver: zodResolver(metadataFormSchema),
    defaultValues: {
      metakeywords: "",
      metadescription: "",
    },
  })

  const { toast } = useToast();

  const [slug, setSlug] = useState<string | null>(null);
  const [slugformvisibility, setSlugformvisibility] = useState<string | undefined>("block");

  const [contenthtml, setContenthtml] = useState<string | null>(null);
  const [posttitle, setPosttitle] = useState<string | null>(null);
  const [opengraphurl, setOpengraphurl] = useState<string | null>(null);
  const [postdataformvisibility, setPostdataformvisibility] = useState<string | undefined>("hidden");

  // const [metakeywords, setMetakeywords] = useState<string | null>(null);
  // const [metadescription, setMetadescription] = useState<string | null>(null);
  const [metadataformvisibility, setMetadataformvisibility] = useState<string | undefined>("hidden");

  const [postvisibility, setPostvisibility] = useState<boolean>(true);

  async function onSlugSubmit(formdata: z.infer<typeof slugFormSchema>) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${formdata.slug}`, {
      method: "GET"
    });
    const res = await req.json();
    if (res.slug) {
      toast({
        variant: "destructive",
        description: `${process.env.NEXT_PUBLIC_BASE_URL}/${formdata.slug} is not available`,
      });
    } else {
      toast({
        variant: "default",
        description: `${process.env.NEXT_PUBLIC_BASE_URL}/${formdata.slug} is available`,
        className: "bg-green-300"
      });

      setSlug(formdata.slug);
      setSlugformvisibility("hidden");
      setPostdataformvisibility("block");
    }

  }


  async function onPostDataSubmit(formdata: z.infer<typeof postdataFormSchema>) {
    //check if novel have some content
    setPosttitle(formdata.posttitle);
    setContenthtml(window.localStorage.getItem("html-content"));
    setPostdataformvisibility("hidden");
    setMetadataformvisibility("block")
  }


  async function onMetaDataSubmit(formdata: z.infer<typeof metadataFormSchema>) {
    const reqdata = {
      rslug: slug,
      rtitle: posttitle,
      rcontent: contenthtml,
      rimgurl: opengraphurl,
      rmetakeys: formdata.metakeywords?.split(","),
      rmetadesc: formdata.metadescription,
      rvisibility: true
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqdata),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, requestOptions);

    const res = await response.json();
    router.push("/dashboard/posts")
  }



  return (
    <>
      <p className="text-3xl pb-4">Create A New Post</p>
      <div className={slugformvisibility}>
        <Form {...slugform}>
          <form onSubmit={slugform.handleSubmit(onSlugSubmit)} className="space-y-8">
            <FormField
              control={slugform.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`${process.env.NEXT_PUBLIC_BASE_URL}/`}</FormLabel>
                  <FormControl>
                    <Input placeholder="Post Slug Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Check & Proceed</Button>

          </form>
        </Form>
      </div>


      <div className={postdataformvisibility}>
        <p className="text-sm">Open Graph Image</p>
        <ImageUploadForm opengraphurl={opengraphurl} setOpengraphurl={setOpengraphurl} />
        <Form {...postdataform}>
          <form onSubmit={postdataform.handleSubmit(onPostDataSubmit)} className="space-y-8">
            <FormField
              control={postdataform.control}
              name="posttitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post Title Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm">Post Content</p>
            <TailwindAdvancedEditor />

            <div className="flex gap-4">
              <Button>Preview</Button>
              <Button type="submit">Check & Proceed</Button>
            </div>


          </form>
        </Form>
      </div>

      <div className={metadataformvisibility}>
        <Form {...metadataform}>
          <form onSubmit={metadataform.handleSubmit(onMetaDataSubmit)} className="space-y-8">
            <FormField
              control={metadataform.control}
              name="metakeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="Comma (,) seperated meta keywords here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={metadataform.control}
              name="metadescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Meta Description Here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button>Preview</Button>
              <Button type="submit">Post New Post</Button>
            </div>


          </form>
        </Form>
      </div>
    </>
  );
}

export default page;
