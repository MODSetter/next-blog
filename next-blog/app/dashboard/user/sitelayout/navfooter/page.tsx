"use client";

import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { P } from "ts-pattern";
import { CirclePlus, Trash2Icon } from "lucide-react";

// const REQUIRED_ERROR = "This field is required.";

const linksSchema = z.object({
    //  name: z.string().nonempty({ message: REQUIRED_ERROR }),
    //  country: z.union([z.literal("USA"), z.literal("POL")]).optional(),
    //  retired: z.boolean(),
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

// type Employee = z.infer<typeof employeeSchema>;

const useDynamicForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            navbar: "NAVBAR-1",
            footer: "FOOTER-1",
            navbarlinks: [{
                name: "",
                href: "/",
                css: "",
                icon: "",
            }],
            footerlinks: [{
                name: "",
                href: "/",
                css: "",
                icon: "",
            }],
        },
    });

    const { fields: navfields, append: navappend, remove: navremove } = useFieldArray({
        control: form.control,
        name: "navbarlinks",
    });


    const { fields: footerfields, append: footerappend, remove: footerremove } = useFieldArray({
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

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    return { form, onSubmit, navlinks: navfields, footerlinks: footerfields, handleRemoveNav, handleInsertNav, handleRemoveFooter, handleInsertFooter };
};

export const DynamicForm = () => {
    const { form, onSubmit, navlinks, footerlinks, handleRemoveNav, handleInsertNav, handleRemoveFooter, handleInsertFooter } = useDynamicForm();

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