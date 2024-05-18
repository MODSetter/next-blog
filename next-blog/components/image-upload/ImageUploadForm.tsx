"use client";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleX, CloudUpload } from "lucide-react";
import { uploadFile } from "@/db/setters";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/components/ui/use-toast";

export function ImageUploadForm({
    opengraphurl,
    setOpengraphurl,
}: {
    opengraphurl: React.ReactNode;
    setOpengraphurl: Dispatch<SetStateAction<string | null>>;
}) {
    const { toast } = useToast();
    const handleSubmit = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0];
                //call Upload API
                console.log("file", file);
                // console.log("ENC", `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`)
                const res = await uploadFile(file);
                if (res.url) {
                    setOpengraphurl(res.url);
                } else {
                    toast({
                        variant: "destructive",
                        description: `Something Wrong with File`,
                    });
                }
            }
        };
        input.click();
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload</CardTitle>
                <CardDescription>
                    Click the button below to select Image.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
                {opengraphurl ? (<>
                    <CircleX onClick={() => setOpengraphurl(null)}/>
                    <img src={opengraphurl} alt="Opengraph Image" />
                </>

                ) : (
                    <>
                        <CloudUpload size={24} />
                        <Button variant="outline" onClick={handleSubmit}>
                            Select Files
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default ImageUploadForm;
