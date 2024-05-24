"use client";
import BgOption from "@/components/dashboard/themes/BgOption";
import { LIGHT_BG_OPTIONS, DARK_BG_OPTIONS } from "@/components/next-toggle/background-provider"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";


const page = () => {
    const { toast } = useToast();

    const [lighttheme, setLighttheme] = useState<string>("");
    const [darktheme, setDarktheme] = useState<string>("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/theme`)
            .then(response => response.json())
            .then(data => {
                setLighttheme(data.defaultLight);
                setDarktheme(data.defaultDark)
            })
    }, []);

    async function onSubmit(lightcode: string, darkcode: string) {
        const reqdata = {
            defaultLight: lightcode,
            defaultDark: darkcode,
        };
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
        };
        const response = await fetch("/api/user/theme", requestOptions);

        const res = await response.json();
        if (res.id) {
            toast({
                variant: "default",
                description: `Themes Updated`,
                className: "bg-green-400/20 backdrop-blur-lg"
            });
        }


    }

    return (
        <div className="flex flex-col gap-4 justify-between">
            <div className="text-2xl">Select Default Dark & Light Themes</div>
            <div className="flex justify-between gap-2">
                <div className="p-4 border rounded-lg border-dashed">Light Theme Selected: <span className="font-semibold">{lighttheme === "L" ? "Default Light" : `Light Theme ${lighttheme.slice(-1)}`}</span></div>
                <div className="p-4 border rounded-lg border-dashed">Dark Theme Selected: <span className="font-semibold">{darktheme === "D" ? "Default Dark" : `Dark Theme ${darktheme.slice(-1)}`}</span></div>
                <Button onClick={() => onSubmit(lighttheme, darktheme)}>Save</Button>
            </div>
            <div>
                <div className="text-xl my-2">Light Theme's</div>
                <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className={"relative min-h-[300px] w-full overflow-hidden rounded-lg ring-1"}>
                        <div className="absolute left-4 top-4 z-10 cursor-pointer">
                            <div className="flex flex-row gap-4">
                                <div
                                    className=" rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white"
                                    onClick={() => {
                                        setLighttheme("L");
                                        toast({
                                            variant: "default",
                                            description: `Default Light is selected`,
                                        });
                                    }}
                                >
                                    Select
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 -z-10 h-full w-full bg-white" />
                    </div>
                    {LIGHT_BG_OPTIONS.map((background, index) => {
                        return (
                            <BgOption
                                key={index}
                                setThemeCode={setLighttheme}
                                themecode={background.themecode}
                            >
                                {background.component}
                            </BgOption>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="text-xl my-2">Dark Theme's</div>
                <div className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className={"relative min-h-[300px] w-full overflow-hidden rounded-lg ring-1"}>
                        <div className="absolute left-4 top-4 z-10 cursor-pointer">
                            <div className="flex flex-row gap-4">
                                <div
                                    className=" rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white"
                                    onClick={() => {
                                        setDarktheme("D");
                                        toast({
                                            variant: "default",
                                            description: `Default Dark is selected`,
                                        });
                                    }}
                                >
                                    Select
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 -z-10 h-full w-full bg-black" />
                    </div>
                    {DARK_BG_OPTIONS.map((background, index) => {
                        return (
                            <BgOption
                                key={index}
                                setThemeCode={setDarktheme}
                                themecode={background.themecode}
                            >
                                {background.component}
                            </BgOption>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default page