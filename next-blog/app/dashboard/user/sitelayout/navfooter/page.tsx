"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2Icon } from "lucide-react";
import ImageUploadForm from "@/components/image-upload/ImageUploadForm";
import { useEffect, useState } from "react";


const linksSchema = z.object({
    name: z.string(),
    href: z.string(),
    css: z.string(),
    icon: z.string(),
});

const formSchema = z.object({
    navbar: z.string(),
    footer: z.string(),
    navbarlinks: z.array(linksSchema),
    footerlinks: z.array(linksSchema),
});

// interface DbVals {
//     navbar: string,
//     footer: string,
//     navbarlinks: string,
//     footerlinks: string,
//     navbarlogo: string,
// }

export const DynamicForm = () => {
    const [dbnavbar,setDbnavbar] = useState<string>("");
    const [dbfooter,setDbfooter] = useState<string>("");
    const [dbnavbarlinks,setDbnavbarlinks] = useState<string>("[]");
    const [dbfooterlinks,setDbfooterlinks] = useState<string>("[]");
    const [navlogo, setNavlogo] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/navfooter`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setDbnavbar(data.navbar);
            setDbfooter(data.footer);
            setDbnavbarlinks(data.navbarlinks);
            setDbfooterlinks(data.footerlinks);
            setNavlogo(data.navbarlogo)
          })
      }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            navbar: dbnavbar,
            footer: dbfooter,
            navbarlinks: JSON.parse(dbnavbarlinks),
            footerlinks: JSON.parse(dbfooterlinks),
        },
    });

    const { fields: navlinks, append: navappend, remove: navremove } = useFieldArray({
        control: form.control,
        name: "navbarlinks",
    });


    const { fields: footerlinks, append: footerappend, remove: footerremove } = useFieldArray({
        control: form.control,
        name: "footerlinks",
    });


    const handleRemoveNav = (index: number) => {
        navremove(index)
    }

    const handleInsertNav = () => {
        navappend({
            name: "",
            href: "/",
            css: "",
            icon: "",
        })
    }


    const handleRemoveFooter = (index: number) => {
        footerremove(index)
    }

    const handleInsertFooter = () => {
        footerappend({
            name: "",
            href: "/",
            css: "",
            icon: "",
        })
    }

    const onSubmit: any = async (data: z.infer<typeof formSchema>) => {
        // console.log(data,navlogo);
        //save to db user
        const reqdata = {
            navbar: data.navbar,
            footer: data.footer,
            navbarlinks: data.navbarlinks,
            footerlinks: data.footerlinks,
          };
          const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
          };
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/navfooter`, requestOptions);
      
          const res = await response.json();
          console.log(res)
    };
    
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border flex max-w-lg m-auto flex-col gap-2 space-y-2 p-6 mt-10 rounded-lg">
                <FormField
                    control={form.control}
                    name="navbar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Select Navbar</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <p className="my-3 text-sm">Admin Avatar:</p>
                    <ImageUploadForm opengraphurl={navlogo} setOpengraphurl={setNavlogo} />
                </div>


                <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Navbar Links</h2>

                    {navlinks.map(({ name, href, css, icon }, index) => (
                        <div className="flex gap-2 " key={name}>
                            <FormField
                                control={form.control}
                                name={`navbarlinks.${index}.name`}
                                render={({ field }) => (
                                    <div className="flex items-start justify-center gap-2">
                                        <FormItem className="flex-grow">
                                            {index === 0 && <FormLabel>Name</FormLabel>}
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`navbarlinks.${index}.href`}
                                render={({ field }) => {
                                    return (
                                        <div className="flex items-start justify-center gap-2">
                                            <FormItem className="flex-grow">
                                                {index === 0 && <FormLabel>Link</FormLabel>}
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                            <Button type="button" onClick={() => handleRemoveNav(index)} size="icon" variant="outline" className="place-self-end">
                                                <Trash2Icon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    ))}
                    <Button type="button" onClick={() => handleInsertNav()} size="icon" variant="outline">
                        <CirclePlus className="w-4 h-4" />
                    </Button>
                </div>

                <FormField
                    control={form.control}
                    name="footer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Select Footer</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Footer Links</h2>
                    {footerlinks.map(({ name, href, css, icon }, index) => (
                        <div className="flex gap-2 " key={name}>
                            <FormField
                                control={form.control}
                                name={`footerlinks.${index}.name`}
                                render={({ field }) => (
                                    <div className="flex items-start justify-center gap-2">
                                        <FormItem className="flex-grow">
                                            {index === 0 && <FormLabel>Name</FormLabel>}
                                            <FormControl>
                                                <Input placeholder="Tab Name" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`footerlinks.${index}.href`}
                                render={({ field }) => {
                                    return (
                                        <div className="flex items-start justify-center gap-2">
                                            <FormItem className="flex-grow">
                                                {index === 0 && <FormLabel>Link</FormLabel>}
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                            <Button type="button" onClick={() => handleRemoveFooter(index)} size="icon" variant="outline" className="place-self-end">
                                                <Trash2Icon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    ))}

                    <Button type="button" onClick={() => handleInsertFooter()} size="icon" variant="outline">
                        <CirclePlus className="w-4 h-4" />
                    </Button>
                </div>
                <Button>Save</Button>
            </form>
        </Form>
    );
};

export default DynamicForm;