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
import { useEffect, useState } from "react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";


const compFormSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
    tailwindcss: z.string(),
})


interface EditComponentParam {
    params: { id: string };
}



export const EditComponent = ({
    params: { id },
}: EditComponentParam) => {
    const router = useRouter();

    const { toast } = useToast();
    const [loadingState, setloadingState] = useState(false);
    const [compid, setCompid] = useState<string>("");
    const [tailwindCss, setTailwindCss] = useState<string>("");


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component/${id}`)
            .then(response => response.json())
            .then(data => {
                const content = JSON.parse(data.content)
                window.localStorage.setItem("html-content", content.html);
                window.localStorage.setItem("novel-content", content.json);

                setCompid(data.id);
                setTailwindCss(data.tailwindcss);

                setloadingState(true);
            })
    }, []);

    const compform = useForm<z.infer<typeof compFormSchema>>({
        resolver: zodResolver(compFormSchema),
        values: {
            name: compid,
            tailwindcss: tailwindCss,
        },
    })

    async function onSubmit(formdata: z.infer<typeof compFormSchema>) {
        const contentobj = {
            json: window.localStorage.getItem("novel-content"),
            html: window.localStorage.getItem("html-content")
        }

        const reqdata = {
            oldname: compid,
            newname: formdata.name,
            content: JSON.stringify(contentobj),
            tailwindcss: formdata.tailwindcss,
        };

        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
        };
        console.log(requestOptions.body)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component`, requestOptions);

        const res = await response.json();
        if (res.id) {
            toast({
                variant: "default",
                description: `Component Updated`,
                className: "bg-green-400/20 backdrop-blur-lg"
            });


        }

        window.localStorage.removeItem("novel-content");
        window.localStorage.removeItem("html-content");
        router.push("/dashboard/user/sitelayout/components/manage")
    }



    return (
        <>
            {loadingState ? (
                <>
                    <div>
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-3">Content</p>
                        <TailwindAdvancedEditor />
                    </div>
                    <Form {...compform}>
                        <form onSubmit={compform.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={compform.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Component Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={field.value} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={compform.control}
                                name="tailwindcss"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Component Tailwind CSS</FormLabel>
                                        <FormControl>
                                            <Input placeholder={field.value} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update</Button>
                        </form>
                    </Form>
                </>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full p-10">
                    LOADING
                </div>
            )}
        </>
    );
}

export default EditComponent;
