"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import "../../styles.scss"

import { Button } from "@/components/tailwind/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SetStateAction, useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast"
import type { Tag } from '@/components/react-tag-input/components/SingleTag';
import { WithContext as ReactTags, SEPARATORS } from '@/components/react-tag-input/index';
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import ImageUploadForm from "@/components/image-upload/ImageUploadForm";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { JSONContent } from "novel";
import { UndoDot } from "lucide-react";
import { generateJSON } from "@tiptap/html";


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
  metadescription: z.string().min(150, {
    message: "Meta Description must be at least 150 characters.",
  }),
  postvisibility: z.boolean(),
})

interface BlogPostPageProps {
  params: { postslug: string };
}



export const page = ({
  params: { postslug },
}: BlogPostPageProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const [slug, setSlug] = useState<string>("");


  const [contentjson, setContentjson] = useState<string | null>(null);
  const [contenthtml, setContenthtml] = useState<string | null>(null);
  const [posttitle, setPosttitle] = useState<string>("");
  const [opengraphurl, setOpengraphurl] = useState<string | null>(null);
  const [metakeywords, setMetakeywords] = useState<string>("");
  const [metadescription, setMetadescription] = useState<string>("");
  const [postvisibility, setPostvisibility] = useState<boolean>(true);

  const [slugformvisibility, setSlugformvisibility] = useState<string | undefined>("block");
  const [postdataformvisibility, setPostdataformvisibility] = useState<string | undefined>("hidden");
  const [contentsectionvisibility, setContentsectionvisibility] = useState<string | undefined>("hidden");
  const [metadataformvisibility, setMetadataformvisibility] = useState<string | undefined>("hidden");

  const [tags, setTags] = useState<Array<Tag>>([
    // { id: "India", text: "India", className: "" },
    // { id: "Vietnam", text: "Vietnam", className: "" },
    // { id: "Turkey", text: "Turkey", className: "" },
  ]);

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index: number, newTag: Tag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag: Tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${postslug}`)
      .then(response => response.json())
      .then(data => {
        console.log("DATA", data)

        const content = JSON.parse(data.content)
        // console.log(typeof content.json)
        window.localStorage.setItem("html-content", content.html);
        window.localStorage.setItem("novel-content", content.json);

        
        setSlug(data.slug);
        // setContentjson();
        setPosttitle(data.title);
        setOpengraphurl(data.opengraphimage);
        setMetakeywords(data.metaKeywords.join(","));
        setMetadescription(data.metaDescription);
        setPostvisibility(data.visibility);

        


        // console.log("CTAGS", data.tags)

        //If Tags Exist Set tags
        if (data.tags) {
          let ctags: SetStateAction<Tag[]> | { id: any; text: any; className: string; }[] = []
          data.tags.forEach((data: any) => {
            const tagentry = {
              id: data.tagname, text: data.tagname, className: ""
            }
            ctags.push(tagentry)
          });
          // console.log("CTAGS", ctags)
          setTags(ctags);
        }
      })
  }, []);

  const slugform = useForm<z.infer<typeof slugFormSchema>>({
    resolver: zodResolver(slugFormSchema),
    values: {
      slug: slug,
    },
  })

  const postdataform = useForm<z.infer<typeof postdataFormSchema>>({
    resolver: zodResolver(postdataFormSchema),
    values: {
      posttitle: posttitle,
    },
  })


  const metadataform = useForm<z.infer<typeof metadataFormSchema>>({
    resolver: zodResolver(metadataFormSchema),
    values: {
      metakeywords: metakeywords,
      metadescription: metadescription,
      postvisibility: postvisibility,
    },
  })

  async function onSlugSubmit(formdata: z.infer<typeof slugFormSchema>) {
    if (postslug === formdata.slug) {
      setSlug(formdata.slug);
      setSlugformvisibility("hidden");
      setPostdataformvisibility("block");

      toast({
        variant: "default",
        description: `${process.env.NEXT_PUBLIC_BASE_URL}/${formdata.slug} is available`,
        className: "bg-green-400/20 backdrop-blur-lg"
      });
    } else {
      const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getpostbyslug/${formdata.slug}`, {
        method: "GET"
      });
      const res = await req.json();
      if (res.slug) {
        toast({
          variant: "destructive",
          description: `${process.env.NEXT_PUBLIC_BASE_URL}/${formdata.slug} is not available`,
          className: "backdrop-blur-lg"
        });
      } else {
        toast({
          variant: "default",
          description: `${process.env.NEXT_PUBLIC_BASE_URL}/${formdata.slug} is available`,
          className: "bg-green-400/20 backdrop-blur-lg"
        });

        setSlug(formdata.slug);
        setSlugformvisibility("hidden");
        setPostdataformvisibility("block");
      }
    }
  }


  async function onPostDataSubmit(formdata: z.infer<typeof postdataFormSchema>) {
    setPosttitle(formdata.posttitle);
    setPostdataformvisibility("hidden");
    setContentsectionvisibility("block")
  }

  async function onContentSubmit() {
    setContentjson(window.localStorage.getItem("novel-content"));
    setContenthtml(window.localStorage.getItem("html-content"));
    setContentsectionvisibility("hidden")
    setMetadataformvisibility("block")
  }


  async function onMetaDataSubmit(formdata: z.infer<typeof metadataFormSchema>) {
    const contentobj = {
      json: contentjson,
      html: contenthtml
    }
    const reqdata = {
      rslug: slug,
      nslug: postslug,
      rtitle: posttitle,
      rcontent: JSON.stringify(contentobj),
      rimgurl: opengraphurl,
      rmetakeys: formdata.metakeywords?.split(","),
      rmetadesc: formdata.metadescription,
      rvisibility: formdata.postvisibility,
      rtags: tags,
      updatedAt: new Date()
    };
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqdata),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, requestOptions);

    const res = await response.json();
    if (res.slug) {
      toast({
        variant: "default",
        description: `Post Edited Successfully`,
        className: "bg-green-400/20 backdrop-blur-lg"
      });
    }
    router.push("/dashboard/posts/1")
  }



  return (
    <>
      <p className="text-3xl pb-4">Edit A New Post</p>
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
                    <Input {...field} />
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
      <Button onClick={() => {
        setPostdataformvisibility("hidden");
        setSlugformvisibility("block");
      }} className="flex gap-2 my-2"><UndoDot />Go Back
        </Button>
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
                    <Input placeholder={posttitle} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <p className="text-sm py-2">Select Tags</p>
              {/* suggestions={suggestions} */}
              <ReactTags
                tags={tags}
                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                onTagUpdate={onTagUpdate}
                inputFieldPosition="bottom"
                editable
                clearAll
                onClearAll={onClearAll}
                maxTags={7}
              />
            </div>


            <div className="flex gap-4">
              {/* <Button>Preview</Button> */}
              <Button type="submit">Check & Proceed</Button>
            </div>


          </form>
        </Form>
      </div>

      <div className={contentsectionvisibility}>
      <Button onClick={() => {
        setContentsectionvisibility("hidden");
        setPostdataformvisibility("block")
      }} className="flex gap-2 my-2"><UndoDot />Go Back
        </Button>
        <p className="text-sm py-2">Post Content</p>
        {slug ? <TailwindAdvancedEditor /> : ""}
        <Button onClick={() => onContentSubmit()}>Check & Proceed</Button>
      </div>

      <div className={metadataformvisibility}>

      <Button onClick={() => {
        setMetadataformvisibility("hidden");
        setContentsectionvisibility("block");
      }} className="flex gap-2 my-2"><UndoDot />Go Back
        </Button>
       
        <Form {...metadataform}>
          <form onSubmit={metadataform.handleSubmit(onMetaDataSubmit)} className="space-y-8">
            <FormField
              control={metadataform.control}
              name="metakeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder={metakeywords} {...field} />
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
                    <Input placeholder={metadescription} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={metadataform.control}
              name="postvisibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Visibility</FormLabel>
                  <FormControl>
                    <div>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Set Post Visibility To Treat This Post as A Page instead of Post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="flex gap-4">
              <Button>Preview</Button>
              <Button type="submit">Update Post</Button>
            </div>


          </form>
        </Form>
      </div>
    </>
  );
}

export default page;
