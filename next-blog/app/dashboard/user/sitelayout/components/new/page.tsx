"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { defaultEditorContent } from "@/lib/content";

const typeformSchema = z.object({
  comptype: z.string(),
});

const nameformSchema = z.object({
  name: z.string(),
});

const cssformSchema = z.object({
  tailwindcss: z.string(),
});


const NewComponent = () => {
  const typeform = useForm<z.infer<typeof typeformSchema>>({
    resolver: zodResolver(typeformSchema),
    values: {
      comptype: "",
    },
  });

  const nameform = useForm<z.infer<typeof nameformSchema>>({
    resolver: zodResolver(nameformSchema),
    values: {
      name: "",
    },
  });

  
  const cssform = useForm<z.infer<typeof cssformSchema>>({
    resolver: zodResolver(cssformSchema),
    values: {
      tailwindcss: "",
    },
  });

  const onTypeSubmit: any = async (data: z.infer<typeof typeformSchema>) => {
    console.log(data);
    setBannerformvisibility("block")
  };

  const [compname, setCompname] = useState<string>("<></>");

  const onNameSubmit: any = async (data: z.infer<typeof nameformSchema>) => {
    console.log(data);
    setCompdataformvisibility("block")
    setCompname(data.name);
  };


  const onCssSubmit: any = async (data: z.infer<typeof cssformSchema>) => {
    console.log(data);
    // setCompdataformvisibility("block")
    const reqdata = {
      name: compname,
      htmlContent: window.localStorage.getItem("html-content"),
      tailwindcss: data.tailwindcss,
    };

    // console.log(reqdata);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqdata),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component`, requestOptions);

    const res = await response.json();

    console.log(res);
  };

  const [bannerformvisibility, setBannerformvisibility] = useState<string>("hidden");
  const [compdataformvisibility, setCompdataformvisibility] = useState<string>("hidden");

  return (
    <>
      <div>
        <Form {...typeform}>
          <form onSubmit={typeform.handleSubmit(onTypeSubmit)} className="space-y-8">
            <FormField
              control={typeform.control}
              name="comptype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Component Type:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Component Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BANNER">BANNER</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Currently only Banners are supported.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Proceed</Button>
          </form>
        </Form>
      </div>
      <div className={bannerformvisibility}>
        <Form {...nameform}>
          <form onSubmit={nameform.handleSubmit(onNameSubmit)} className="space-y-8">
            <FormField
              control={nameform.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component Name:</FormLabel>
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


      <div className={compdataformvisibility}>
        <div className="flex flex-col">
          <div>
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-3">Content</p>
            <TailwindAdvancedEditor initContent={defaultEditorContent}/>
          </div>
          <div>
          <Form {...cssform}>
          <form onSubmit={cssform.handleSubmit(onCssSubmit)} className="space-y-8">
            <FormField
              control={cssform.control}
              name="tailwindcss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tailwind CSS:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Component</Button>
          </form>
        </Form>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default NewComponent