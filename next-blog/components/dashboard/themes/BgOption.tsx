import { useToast } from '@/components/ui/use-toast';
import React, { Dispatch, SetStateAction, useState } from 'react';

type PlaygroundProps = {
    children: React.ReactElement;
    setThemeCode: Dispatch<SetStateAction<string>>;
    themecode: string;
};

const BgOption: React.FC<PlaygroundProps> = ({
    children,
    setThemeCode,
    themecode,
}) => {
    const { toast } = useToast();

    return (

        <>
            <div className={"relative min-h-[300px] w-full overflow-hidden rounded-lg ring-1"}>
                <div className="absolute left-4 top-4 z-10 cursor-pointer">
                    <div className="flex flex-row gap-4">
                        <div
                            className=" rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white"
                            onClick={() => {
                                setThemeCode(themecode);
                                toast({
                                    variant: "default",
                                    description: `${themecode} is selected`,
                                  });
                            }}
                        >
                            Select
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};

export default BgOption;
