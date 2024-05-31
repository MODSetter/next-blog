"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

import { getGridDisplay } from "../grids/grids-display"

interface Grid {
    id: string;
    comp_one: string;
    comp_two: string;
    comp_three: string;
    comp_four: string;
    comp_five: string;
}

const compFormSchema = z.object({
    compone: z.string(),
    comptwo: z.string(),
    compthree: z.string(),
    compfour: z.string(),
    compfive: z.string(),
})

interface Components {
    id: string;
    htmlContent: string;
    tailwindcss: string;
}

const SelectComponents = () => {
    const [griddisplay, setGriddisplay] = useState<string | undefined>();
    const [grid, setGrid] = useState<Grid>();
    const [customcmps, setCustomcmps] = useState<Components[]>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/grid`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setGriddisplay(data.id)
                setGrid(data)
            })

            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/component`)
            .then(response => response.json())
            .then(data => {
                setCustomcmps(data)
            })
    }, []);


    const compform = useForm<z.infer<typeof compFormSchema>>({
        resolver: zodResolver(compFormSchema),
        values: {
            compone: grid?.comp_one || "",
            comptwo: grid?.comp_two || "",
            compthree: grid?.comp_three || "",
            compfour: grid?.comp_four || "",
            compfive: grid?.comp_five || "",
        },
    })


  

    async function onSubmit(formdata: z.infer<typeof compFormSchema>) {
        const reqdata = {
            gridId: griddisplay,
            compone: formdata.compone,
            comptwo: formdata.comptwo,
            compthree: formdata.compthree,
            compfour: formdata.compfour,
            compfive: formdata.compfive,
          };
          const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
          };
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/grid`, requestOptions);
      
          const res = await response.json();
          if (res.id) {
            toast({
              variant: "default",
              description: `Component Selection Saved`,
              className: "bg-green-400/20 backdrop-blur-lg"
            });
          }
          console.log(res)
        //   router.push("/dashboard/posts")
    }

    if(grid){


        return (
            <>
                <div>
                    <p className="text-sm my-2">Current Grid: <span className="font-semibold underline underline-offset-4">{griddisplay}</span></p>
                    {getGridDisplay(griddisplay)}
                </div>
                <Form {...compform}>
                    <form onSubmit={compform.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
    
                        <FormField
                            control={compform.control}
                            name="compone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Component @1</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="POSTLIST-SM-1">PostList - Small Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-SM-2">PostList - Small Post Card 2</SelectItem>
                                            <SelectItem value="POSTLIST-LG-1">PostList - Large Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-LG-2">PostList - Large Post Card 2</SelectItem>
                                            {customcmps?.map((cmpt) => (
                                                <SelectItem value={`CUSTOM-BANNER-${cmpt.id}`}>{cmpt.id}</SelectItem>
                                            ))}
                                            <SelectItem value="XYZ-1">None</SelectItem>
                                        </SelectContent>
                                    </Select>
    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            control={compform.control}
                            name="comptwo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Component @2</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="POSTLIST-SM-1">PostList - Small Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-SM-2">PostList - Small Post Card 2</SelectItem>
                                            <SelectItem value="POSTLIST-LG-1">PostList - Large Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-LG-2">PostList - Large Post Card 2</SelectItem>
                                            {customcmps?.map((cmpt) => (
                                                <SelectItem value={`CUSTOM-BANNER-${cmpt.id}`}>{cmpt.id}</SelectItem>
                                            ))}
                                            <SelectItem value="XYZ-1">None</SelectItem>
                                        </SelectContent>
                                    </Select>
    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            control={compform.control}
                            name="compthree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Component @3</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="POSTLIST-SM-1">PostList - Small Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-SM-2">PostList - Small Post Card 2</SelectItem>
                                            <SelectItem value="POSTLIST-LG-1">PostList - Large Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-LG-2">PostList - Large Post Card 2</SelectItem>
                                            {customcmps?.map((cmpt) => (
                                                <SelectItem value={`CUSTOM-BANNER-${cmpt.id}`}>{cmpt.id}</SelectItem>
                                            ))}
                                            <SelectItem value="XYZ-1">None</SelectItem>
                                        </SelectContent>
                                    </Select>
    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            control={compform.control}
                            name="compfour"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Component @4</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="POSTLIST-SM-1">PostList - Small Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-SM-2">PostList - Small Post Card 2</SelectItem>
                                            <SelectItem value="POSTLIST-LG-1">PostList - Large Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-LG-2">PostList - Large Post Card 2</SelectItem>
                                            {customcmps?.map((cmpt) => (
                                                <SelectItem value={`CUSTOM-BANNER-${cmpt.id}`}>{cmpt.id}</SelectItem>
                                            ))}
                                            <SelectItem value="XYZ-1">None</SelectItem>
                                        </SelectContent>
                                    </Select>
    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            control={compform.control}
                            name="compfive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Component @5</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.value} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="POSTLIST-SM-1">PostList - Small Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-SM-2">PostList - Small Post Card 2</SelectItem>
                                            <SelectItem value="POSTLIST-LG-1">PostList - Large Post Card 1</SelectItem>
                                            <SelectItem value="POSTLIST-LG-2">PostList - Large Post Card 2</SelectItem>
                                            {customcmps?.map((cmpt) => (
                                                <SelectItem value={`CUSTOM-BANNER-${cmpt.id}`}>{cmpt.id}</SelectItem>
                                            ))}
                                            <SelectItem value="XYZ-1">None</SelectItem>
                                        </SelectContent>
                                    </Select>
    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <Button type="button">Preview</Button>
                            <Button type="submit">Save</Button>
                        </div>
    
                    </form>
                </Form>
            </>
        )
    } 
}

export default SelectComponents