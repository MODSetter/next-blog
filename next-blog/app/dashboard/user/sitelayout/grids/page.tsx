"use client"
import { useState } from "react"
import {getGridDisplay} from "./grids-display"
import { Button } from "@/components/ui/button";

const GridSettings = () => {
    const [griddisplay, setGriddisplay] = useState<string | undefined>();
    
    return (
        <>
        
            <p className="my-4">Grid Settings</p>
            <div className="flex justify-between">
            <div className="flex flex-wrap gap-4">
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-1")}>Grid #1</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-2")}>Grid #2</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-3")}>Grid #3</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-4")}>Grid #4</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-5")}>Grid #5</p>
            </div>
            <p className="border px-6 py-2 rounded-full bg-red-400/20 backdrop-blur-lg place-self-center">Save</p>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <p className="">Grid Selected:</p>
                {getGridDisplay(griddisplay)}
            </div>
        </>
    )
}

export default GridSettings